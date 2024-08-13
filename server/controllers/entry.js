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

const addEntry = async ({ diary, date, rating, activities }, userid) => {
    let q = "SELECT * FROM entry WHERE user_id = ? AND date = ?"
    const [res] = await pool.execute(q, [userid, date])
    if (res.length !== 0)
        return ({ message: "an entry for this date already exists", code: 409 })

    const conn = await pool.getConnection();
    await conn.beginTransaction()
    q = "INSERT INTO entry VALUE (NULL, ?, ?, ?, ?)"
    const [{ insertId: entryId }] = await conn.execute(q, [userid, date, rating, diary])
    const values = activities.map(activity => [entryId, activity])
    q = "INSERT INTO entryActivity VALUES ?"
    await conn.query(q, [values])
    await conn.commit()

    return ({ message: "entry is added successfully", code: 201 })
}

const getEntries = async (userid) => {
    const q = "SELECT * FROM entry WHERE user_id = ? ORDER BY date DESC"
    const [res] = await pool.execute(q, [userid])
    return ({ entries: res, code: 200 })
}

const getEntry = async (entryid) => {
    let q = "SELECT * FROM entry WHERE id = ?"
    const [entry] = await pool.execute(q, [entryid])
    q = "SELECT * FROM entryActivity WHERE entry_id = ?"
    const [res] = await pool.execute(q, [entryid])
    const activities = res.map(obj => obj.activity)

    return ({ entry: { ...entry[0], activities }, code: 200 })
}

const deleteEntry = async (entryid) => {
    const conn = await pool.getConnection();
    await conn.beginTransaction()
    let q = "DELETE FROM entryActivity WHERE entry_id = ?"
    await conn.execute(q, [entryid])
    q = "DELETE FROM entry WHERE id = ?"
    await conn.execute(q, [entryid])
    await conn.commit()

    return ({ message: "entry is deleted successfully", code: 200 })
}

export { getActivities, addEntry, getEntries, getEntry, deleteEntry }