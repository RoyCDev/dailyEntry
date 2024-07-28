import GoalCard from "../components/GoalCard"
import GoalForm from "../components/GoalForm.jsx"
import GoalDeleteModal from "../components/GoalDeleteModal.jsx"

import { useState } from "react"
import { VStack, useDisclosure } from "@chakra-ui/react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { entryClient } from "../../util.js"

function GoalPage() {
    const [selectedGoal, setSelectedGoal] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()
    const queryClient = useQueryClient()

    const { data: goals } = useQuery({
        queryKey: ["goals"],
        queryFn: async () => {
            const res = await entryClient.get("/goals")
            return res.data.goals
        }
    })

    const onModalOpen = (goal) => {
        onOpen()
        setSelectedGoal(goal)
    }

    const onModalClose = () => {
        onClose()
        setSelectedGoal({})
    }

    const { mutate: handleCreate } = useMutation({
        mutationFn: async (inputs) => {
            return await entryClient.post("/goals", inputs)
        },
        onSuccess: () => queryClient.invalidateQueries("goals")
    })

    const { mutate: handleUpdate } = useMutation({
        mutationFn: async ({ id, newDesc }) => {
            return await entryClient.put(`/goals/${id}`, { desc: newDesc })
        }
    })

    const { mutate: handleDelete } = useMutation({
        mutationFn: async () => {
            return await entryClient.delete(`/goals/${selectedGoal.id}`)
        },
        onSuccess: () => {
            onModalClose()
            queryClient.invalidateQueries("goals")
        },
    })

    const renderedGoals = goals?.map(goal => (
        <GoalCard
            key={goal.id}
            goal={goal}
            onModalOpen={onModalOpen}
            onUpdate={handleUpdate} />
    ))

    return (
        <>
            <GoalForm onSubmit={handleCreate} />
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