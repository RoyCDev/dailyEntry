import GoalCard from "../components/GoalCard"
import GoalForm from "../components/GoalForm"
import GoalTab from "../components/GoalTab"
import GoalTabPanel from "../components/GoalTabPanel"
import DeleteModal from "../components/DeleteModal"

import { useState } from "react"
import {
    Tabs,
    TabList,
    TabPanels,
    useDisclosure
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { entryClient } from "../../util.js"

function GoalPage() {
    const [selectedGoal, setSelectedGoal] = useState({})
    const { isOpen, onOpen, onClose } = useDisclosure()

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

    const ongoing = []
    const completed = []

    for (const goal of goals ?? []) {
        const card =
            <GoalCard
                key={goal.id}
                goal={goal}
                onModalOpen={onModalOpen} />

        goal.completed_date ? completed.push(card) : ongoing.push(card)
    }

    return (
        <Tabs variant="solid-rounded" colorScheme="brand" m="0 auto"
            maxW={{ md: "97.5%" }}
            size={{ base: "sm", lg: "md" }}
            isFitted={{ base: true, lg: false }}>
            <TabList bg="white" borderRadius="full" w={{ lg: "fit-content" }}>
                <GoalTab badge={ongoing.length}>Ongoing</GoalTab>
                <GoalTab badge={completed.length}>Completed</GoalTab>
            </TabList>

            <GoalForm my={5} />

            <TabPanels>
                <GoalTabPanel goals={ongoing} />
                <GoalTabPanel goals={completed} />
            </TabPanels>

            <DeleteModal
                isOpen={isOpen}
                onModalClose={onModalClose}
                selectedGoal={selectedGoal} />
        </Tabs >
    )
}

export default GoalPage