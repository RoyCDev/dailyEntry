import pool from "../db.js"
import bcrypt from "bcrypt"

const signup = async ({ username, email, password }) => {
    const q = "SELECT * FROM user WHERE username = ? OR email = ?"
    const [res] = await pool.execute(q, [username, email])
    if (res.length === 0) {
        const hashed = await bcrypt.hash(password, 10)
        const q = "INSERT INTO user VALUE (NULL, ?, ?, ?)"
        await pool.execute(q, [username, email, hashed])
        return { message: "signup successfully", code: 201 }
    }
    return { message: "username and/ or email is already used", code: 409 }
}

const login = async ({ username, password }) => {
    const q = "SELECT * FROM user WHERE username = ?"
    const [res] = await pool.execute(q, [username])
    if (res.length !== 0) {
        const match = await bcrypt.compare(password, res[0].password)
        if (match) return { message: "login successfully", userid: res[0].id, code: 200 }
    }
    return { message: "incorrect username and/ or password", code: 401 }
}

export { signup, login }