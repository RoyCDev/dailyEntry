import Goal from "../components/Goal"
import GoalForm from "../components/GoalForm.jsx"
import GoalDeleteModal from "../components/GoalDeleteModal.jsx"

import { useState, useEffect } from "react"
import { VStack } from "@chakra-ui/react"
import entryClient from "../../util.js"

function GoalPage() {
    const [goals, setGoals] = useState([])
    console.log(goals)

    useEffect(() => {
        const fetchGoals = async () => {
            const res = await entryClient.get("/goals")
            setGoals(res.data.goals)
        }
        fetchGoals()
    }, [])

    const handleDelete = async (id) => {
        const res = await entryClient.delete(`/goals/${id}`)
        setGoals(prev => prev.filter(goal => goal.id !== id))
    }

    const handleSubmit = async (inputs) => {
        const res = await entryClient.post("/goals", inputs)
    }

    const renderedGoals = goals.map(goal => (
        <Goal key={goal.id} goal={goal} onDelete={handleDelete}></Goal>)
    )

    return (
        <>
            <GoalForm onSubmit={handleSubmit} />
            <VStack alignItems="start" gap={5} mt={5}>
                {renderedGoals}
            </VStack>
            <GoalDeleteModal />
        </>
    )
}

export default GoalPage