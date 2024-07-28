import {
    Box,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    Editable,
    EditablePreview,
    EditableTextarea,
    HStack,
    Portal,
    Spacer,
    Tag,
    Text,
} from '@chakra-ui/react'

import { useRef } from 'react'
import EditableControls from './EditableControls'
import { entryClient } from "../../util.js"

function GoalCard({ goal, onModalOpen, onUpdate }) {
    const ref = useRef()
    const priorityColors = {
        high: "green",
        mid: "yellow",
        low: "red"
    }
    const color = priorityColors[goal.priority]
    const addedDate = new Date(goal.added_date).toLocaleDateString()
    const completedDate = goal.completed_date ?
        new Date(goal.completed_date).toLocaleDateString() :
        null

    const handleStatus = async () => {
        const date = completedDate ?
            null :
            new Date().toISOString().slice(0, 10)
        const res = await entryClient.put(`/goals/${goal.id}`, { completedDate: date })
    }

    return (
        <Card w="100%" variant="outline" borderRadius={12}>
            <HStack px={4} pt={3} alignItems="start">
                <Checkbox iconSize={16} size="xl" variant="circular" colorScheme="brand"
                    onChange={handleStatus} defaultChecked={!!completedDate} />
                <CardBody px={3} py={0}>
                    <Editable defaultValue={goal.description}
                        isPreviewFocusable={false}
                        onSubmit={(newDesc) => onUpdate({ id: goal.id, newDesc })}>
                        <EditablePreview />
                        <EditableTextarea resize="none" />
                        <Portal containerRef={ref}>
                            <EditableControls
                                onModalOpen={() => onModalOpen(goal)} />
                        </Portal>
                    </Editable>
                </CardBody>
                <Tag colorScheme={color}>{goal.priority} priority</Tag>
            </HStack>

            <CardFooter alignItems="center" pr={2.5} py={1.5}>
                <Text fontSize="sm" color="gray.500">
                    {completedDate ?
                        `${addedDate} - ${completedDate}` :
                        `Added: ${addedDate}`
                    }
                </Text>
                <Spacer />
                <Box ref={ref} />
            </CardFooter>
        </Card>
    )
}

export default GoalCard