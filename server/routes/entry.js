import { getActivities, addEntry, getEntries, deleteEntry } from "../controllers/entry.js"
import express from "express"

const router = express.Router()

router.get("/activity", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { activities, code } = await getActivities(req.session.user.id)
        return res.status(code).json({ activities })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

router.post("/", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { message, code } = await addEntry(req.body, req.session.user.id)
        return res.status(code).json({ message })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

router.get("/", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { entries, code } = await getEntries(req.session.user.id)
        return res.status(code).json({ entries })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

router.delete("/:id", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { message, code } = await deleteEntry(req.params.id)
        return res.status(code).json({ message })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

export default router