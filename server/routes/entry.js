import { getActivities, addEntry, getEntries, getEntry, updateEntry, deleteEntry } from "../controllers/entry.js"
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
        const { entries, code } = await getEntries(req.query, req.session.user.id)
        return res.status(code).json({ entries })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

router.get("/:id", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { entry, message, code } = await getEntry(req.params.id, req.session.user.id)
        return res.status(code).json(code === 200 ? { entry } : { message })
    }
    return res.status(401).json({ message: "unauthoirzed access" })
})

router.put("/:id", async (req, res) => {
    if (req.session.isAuthenticated) {
        const { message, code } = await updateEntry(req.body, req.params.id, req.session.user.id)
        return res.status(code).json({ message })
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