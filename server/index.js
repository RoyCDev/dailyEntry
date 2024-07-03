import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'

import session from "express-session"
import { signup, login } from "./controller.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

app.post("/signup", async (req, res) => {
    const { message, code } = await signup(req.body)
    res.status(code).json({ message })
})

app.post("/login", async (req, res) => {
    const { message, userid, code } = await login(req.body)
    if (code === 200) {
        req.session.user = { id: userid }
        req.session.isAuthenticated = true
    }
    res.status(code).json({ message })
})

app.post("/logout", (req, res) => {
    req.session.destroy()
    res.clearCookie("connect.sid")
    res.status(200).json({ message: "logout successfully" })
})

// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).json({ message: 'Something broke!' })
// })

app.listen(3000, () => {
    console.log("Connected to backend")
})