import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'

import session from "express-session"
import { signup, login, addGoal, getGoals, deleteGoal } from "./controller.js"

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

app.get("/goal", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { goals, code } = await getGoals(req.session.user.id)
        return res.status(code).json({ goals })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

app.post("/goal", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { message, code } = await addGoal(req.body, req.session.user.id)
        return res.status(code).json({ message })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

app.delete("/goal/:id", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { message, code } = await deleteGoal(req.params.id)
        return res.status(code).json({ message })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).json({ message: 'Something broke!' })
// })

app.listen(3000, () => {
    console.log("Connected to backend")
})