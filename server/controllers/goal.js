import pool from "../db.js"

const addGoal = async ({ desc, priority, isCompleted }, userid) => {
    const completedDate = isCompleted ? "NOW()" : "NULL"
    const q = `INSERT INTO goal VALUE (NULL, ?, ?, ?, NOW(), ${completedDate})`
    await pool.execute(q, [userid, desc, priority])
    return { message: "goal is added successfully", code: 201 }
}

const getGoals = async (userid) => {
    const q = "SELECT * FROM goal WHERE user_id = ?"
    const [res] = await pool.execute(q, [userid])
    return { goals: res, code: 200 }
}

const updateGoal = async ({ desc, completedDate }, goalid) => {
    if (desc) {
        const q = "UPDATE goal SET description = ? WHERE id = ?"
        await pool.execute(q, [desc, goalid])
        return { message: "goal description is updated successfully", code: 201 }
    }
    else {
        const q = "UPDATE goal SET completed_date = ? WHERE id = ?"
        await pool.execute(q, [completedDate, goalid])
        return { message: "goal status is updated successfully", code: 201 }
    }
}

const deleteGoal = async (goalid) => {
    const q = "DELETE FROM goal WHERE id = ?"
    await pool.execute(q, [goalid])
    return ({ message: "goal is deleted successfully", code: 200 })
}

export { addGoal, getGoals, updateGoal, deleteGoal }