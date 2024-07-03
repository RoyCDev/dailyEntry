import mysql from "mysql2/promise"
import dotenv from 'dotenv'
import bcrypt from "bcrypt"

dotenv.config()
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

const signup = async ({ username, email, password }) => {
    const q = "SELECT * FROM user WHERE username = ? OR email = ?"
    const [res] = await pool.execute(q, [username, email])
    if (res.length === 0) {
        const hashed = await bcrypt.hash(password, 10)
        const q = "INSERT INTO user VALUE (NULL, ?, ?, ?)"
        await pool.execute(q, [username, email, hashed])
        return "signup successfully"
    }
    return "username or email is already used"
}

const login = async ({ username, password }) => {
    const q = "SELECT * FROM user WHERE username = ?"
    const [res] = await pool.execute(q, [username])
    if (res.length !== 0) {
        const match = await bcrypt.compare(password, res[0].password)
        if (match) return "login successfully"
    }
    return "incorrect username/ password"
}

export { signup, login }