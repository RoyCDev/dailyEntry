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
    res.send(await signup(req.body))
})

app.post("/login", async (req, res) => {
    const msg = await login(req.body);
    if (msg === "login successfully") {
        req.session.user = req.body.username;
        req.session.isAuthenticated = true;
    }
    res.send(msg)
})

app.post("/logout", (req, res) => {
    req.session.destroy()
    res.clearCookie("connect.sid")
    res.send("logout successfully")
})

// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// })

app.listen(3000, () => {
    console.log("Connected to backend")
})