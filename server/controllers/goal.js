import pool from "../db.js"

const addGoal = async ({ desc, priority }, userid) => {
    const q = "INSERT INTO goal VALUE (NULL, ?, ?, ?, NOW(), NULL)"
    await pool.execute(q, [userid, desc, priority])
    return { message: "goal is added successfully", code: 201 }
}

const getGoals = async (userid) => {
    const q = "SELECT * FROM goal WHERE user_id = ?"
    const [res] = await pool.execute(q, [userid])
    return { goals: res, code: 201 }
}

const deleteGoal = async (goalid) => {
    const q = "DELETE FROM goal WHERE id = ?"
    await pool.execute(q, [goalid])
    return ({ message: "goal is deleted successfully", code: 200 })
}

export { addGoal, getGoals, deleteGoal }