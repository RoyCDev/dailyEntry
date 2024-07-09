import { signup, login } from "../controllers/auth.js"
import express from "express"

const router = express.Router()

router.post("/signup", async (req, res) => {
    const { message, code } = await signup(req.body)
    res.status(code).json({ message })
})

router.post("/login", async (req, res) => {
    const { message, userid, code } = await login(req.body)
    if (code === 200) {
        req.session.user = { id: userid }
        req.session.isAuthenticated = true
    }
    res.status(code).json({ message })
})

router.post("/logout", (req, res) => {
    req.session.destroy()
    res.clearCookie("connect.sid")
    res.status(200).json({ message: "logout successfully" })
})

export default router