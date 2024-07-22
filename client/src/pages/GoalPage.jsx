import GoalCard from "../components/GoalCard"
import GoalForm from "../components/GoalForm.jsx"
import GoalDeleteModal from "../components/GoalDeleteModal.jsx"

import { useState, useEffect } from "react"
import { VStack, useDisclosure, useToast } from "@chakra-ui/react"
import { entryClient, toastConfig } from "../../util.js"

function GoalPage() {
    const [goals, setGoals] = useState([])
    const [selectedGoal, setSelectedGoal] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    useEffect(() => {
        const fetchGoals = async () => {
            const res = await entryClient.get("/goals")
            setGoals(res.data.goals)
        }
        fetchGoals()
    }, [])

    const onModalOpen = (goal) => {
        onOpen()
        setSelectedGoal(goal)
    }

    const onModalClose = () => {
        onClose()
        setSelectedGoal({})
    }

    const handleDelete = async () => {
        try {
            const res = await entryClient.delete(`/goals/${selectedGoal.id}`)
            toast({ ...toastConfig("success"), description: res.data.message })
            setGoals(prev => prev.filter(goal => goal.id !== selectedGoal.id))
            onModalClose()
        }
        catch (e) {
            toast({ ...toastConfig("error"), description: e.response.data.message })
        }
    }

    const handleSubmit = async (inputs) => {
        const res = await entryClient.post("/goals", inputs)
    }

    const renderedGoals = goals.map(goal => (
        <GoalCard
            key={goal.id}
            goal={goal}
            onModalOpen={onModalOpen} />
    ))

    return (
        <>
            <GoalForm onSubmit={handleSubmit} />
            <VStack alignItems="start" gap={5} mt={5}>
                {renderedGoals}
            </VStack>
            <GoalDeleteModal
                isOpen={isOpen}
                onModalClose={onModalClose}
                onDelete={handleDelete} />
        </>
    )
}

export default GoalPage