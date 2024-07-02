import express from "express"
import mysql from "mysql2/promise"
import dotenv from 'dotenv'
import cors from 'cors'

import bcrypt from "bcrypt"
import session from "express-session"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

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
        return match ? "login successfully" : "incorrect username/ password"
    }
    return "username dosn't exist"
}

app.post("/signup", async (req, res) => {
    res.send(await signup(req.body))
})

app.post("/login", async (req, res) => {
    // console.log(res.session)
    res.send(await login(req.body))
})

// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// })


app.listen(3000, () => {
    console.log("Connected to backend")
})