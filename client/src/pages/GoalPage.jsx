import GoalCard from "../components/GoalCard"
import GoalForm from "../components/GoalForm.jsx"
import GoalDeleteModal from "../components/GoalDeleteModal.jsx"

import { useState, useEffect } from "react"
import { VStack, useDisclosure } from "@chakra-ui/react"
import entryClient from "../../util.js"

function GoalPage() {
    const [goals, setGoals] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

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
        <GoalCard
            key={goal.id}
            goal={goal}
            onDelete={handleDelete}
            onModalOpen={onOpen} />
    ))

    return (
        <>
            <GoalForm onSubmit={handleSubmit} />
            <VStack alignItems="start" gap={5} mt={5}>
                {renderedGoals}
            </VStack>
            <GoalDeleteModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    )
}

export default GoalPage