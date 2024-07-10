import Goal from "../components/Goal"
import { useState } from "react"
import entryClient from "../../util.js"

function GoalPage() {
    const [goals, setGoals] = useState([])
    const [inputs, setInputs] = useState({})
    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await entryClient.post("/goals", inputs)
        console.log(res.data)
    }

    const handleClick = async () => {
        const res = await entryClient.get("/goals")
        setGoals(res.data.goals)
        console.log(res.data.goals)
    }

    const handleDelete = async (id) => {
        const res = await entryClient.delete(`/goals/${id}`)
        setGoals(prev => prev.filter(goal => goal.id !== id))
    }

    const renderedGoals = goals.map(goal => (
        <Goal key={goal.id} goal={goal} onDelete={handleDelete}></Goal>)
    )
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <button>+</button>
                <label htmlFor="new-goal"></label>
                <input type="text" name="desc" id="desc" placeholder="Add a new goal"
                    value={inputs.desc || ''} onChange={handleChange} />
                <select name="priority" id="priority" onChange={handleChange}>
                    <option hidden>select priority</option>
                    <option value="high">High</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </select>
            </form>
            <button onClick={handleClick}>Fetch goals</button>
            {renderedGoals}
        </>
    )
}

export default GoalPage