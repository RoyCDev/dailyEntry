import { getGoals, addGoal, deleteGoal } from "../controllers/goal.js"
import express from "express"

const router = express.Router()

router.get("/", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { goals, code } = await getGoals(req.session.user.id)
        return res.status(code).json({ goals })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

router.post("/", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { message, code } = await addGoal(req.body, req.session.user.id)
        return res.status(code).json({ message })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

router.delete("/:id", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { message, code } = await deleteGoal(req.params.id)
        return res.status(code).json({ message })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

export default router