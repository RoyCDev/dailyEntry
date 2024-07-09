import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import session from "express-session"

import authRoutes from "./routes/auth.js"
import entryRoutes from "./routes/entry.js"
import goalRoutes from "./routes/goal.js"

const app = express()
dotenv.config()

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

app.use("/auth", authRoutes)
app.use("/entries", entryRoutes)
app.use("/goals", goalRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something broke!' })
})

app.listen(3000, () => {
    console.log("Connected to backend")
})
