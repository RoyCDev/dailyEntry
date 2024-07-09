import pool from "../db.js"

const getActivities = async (userid) => {
    const q = `
    SELECT DISTINCT activity 
    FROM entry e 
    INNER JOIN entryActivity ea 
    ON e.id = ea.entry_id 
    WHERE e.user_id = ?`
    const [res] = await pool.execute(q, [userid])
    const activities = res.map(obj => obj.activity)
    return ({ activities, code: 200 })
}

export { getActivities }