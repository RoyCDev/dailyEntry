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

const addEntry = async ({ description, date, mood, activities }, userid) => {
    let q = "SELECT * FROM entry WHERE user_id = ? AND date = ?"
    const [res] = await pool.execute(q, [userid, date])
    if (res.length !== 0)
        return ({ message: "an entry for this date already exists", code: 409 })

    const conn = await pool.getConnection();
    await conn.beginTransaction()
    q = "INSERT INTO entry VALUE (NULL, ?, ?, ?, ?)"
    const [{ insertId: entryid }] = await conn.execute(q, [userid, date, mood, description])
    if (activities.length !== 0) {
        const values = activities.map(activity => [entryid, activity])
        q = "INSERT INTO entryActivity VALUES ?"
        await conn.query(q, [values])
    }
    await conn.commit()

    return ({ message: "entry is added successfully", code: 201 })
}

const getEntries = async ({ year, month }, userid) => {
    const q = `
    SELECT * FROM entry 
    WHERE user_id = ? 
    AND YEAR(date) = ?
    AND MONTH(date) = ?
    ORDER BY date DESC`
    const [res] = await pool.execute(q, [userid, year, month])
    return ({ entries: res, code: 200 })
}

const getEntry = async (entryid, userid) => {
    let q = "SELECT * FROM entry WHERE id = ?"
    const [entry] = await pool.execute(q, [entryid])
    if (entry[0]["user_id"] !== userid) {
        return { message: "unauthoirzed access", code: 401 }
    }

    q = "SELECT * FROM entryActivity WHERE entry_id = ?"
    const [res] = await pool.execute(q, [entryid])
    const activities = res.map(obj => obj.activity)

    return ({ entry: { ...entry[0], activities }, code: 200 })
}

const updateEntry = async ({ description, date, mood, activities }, entryid, userid) => {
    let q = "SELECT * FROM entry WHERE date = ? and user_id = ?"
    const [res] = await pool.execute(q, [date, userid])
    if (res.length !== 0 && res[0].id != entryid) {
        return ({ message: "an entry for this date already exists", code: 409 })
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction()
    q = "UPDATE entry SET description = ?, date = ?, mood = ? WHERE id = ?"
    await conn.execute(q, [description, date, mood, entryid])

    q = "DELETE FROM entryActivity WHERE entry_id = ?"
    await conn.query(q, [entryid])
    if (activities.length !== 0) {
        const values = activities.map(activity => [entryid, activity])
        q = "INSERT INTO entryActivity VALUES ?"
        await conn.query(q, [values])
    }
    await conn.commit()

    return { message: "diary is updated successfully", code: 201 }
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

export { getActivities, addEntry, getEntries, getEntry, updateEntry, deleteEntry }