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
import { format } from "date-fns"
import EditableControls from './EditableControls'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { entryClient, formatDate } from "../../util.js"

const priorityColors = {
    high: "green",
    mid: "yellow",
    low: "red"
}

function GoalCard({ goal, onModalOpen }) {
    const ref = useRef()
    const queryClient = useQueryClient()

    const color = priorityColors[goal.priority]
    const addedDate = formatDate(goal.added_date)
    const completedDate = formatDate(goal.completed_date)

    const { mutate: handleStatus } = useMutation({
        mutationFn: async () => {
            const date = completedDate ?
                null :
                format(new Date(), "yyyy-MM-dd")
            return await entryClient.put(`/goals/${goal.id}`, { completedDate: date })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] })
    })

    const { mutate: handleDesc } = useMutation({
        mutationFn: async (newDesc) => {
            if (newDesc !== goal.description) {
                return await entryClient.put(`/goals/${goal.id}`, { desc: newDesc })
            }
        }
    })

    return (
        <Card w="100%" variant="outline" borderRadius={12}>
            <HStack px={4} pt={3} alignItems="start">
                <Checkbox iconSize={16} size="xl" variant="circular" colorScheme="brand"
                    onChange={handleStatus} defaultChecked={!!completedDate} />
                <CardBody px={3} py={0}>
                    <Editable defaultValue={goal.description}
                        isPreviewFocusable={false}
                        onSubmit={(newDesc) => handleDesc(newDesc)}>
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

            <CardFooter alignItems="center" pr={2.5} py={1.5} mt="auto">
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