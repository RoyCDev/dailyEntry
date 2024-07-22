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

function GoalCard({ goal, onModalOpen }) {
    const ref = useRef()
    const priorityColors = {
        high: "green",
        mid: "yellow",
        low: "red"
    }
    const color = priorityColors[goal.priority]
    const added = new Date(goal.added_date)

    return (
        <Card w="100%" variant="outline" borderRadius={12}>
            <HStack px={4} pt={3} alignItems="start">
                <Checkbox iconSize={16} size="xl" variant="circular" colorScheme="brand" />
                <CardBody px={3} py={0}>
                    <Editable defaultValue={goal.description}
                        isPreviewFocusable={false}
                        onSubmit={(prev) => console.log(prev)}>
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
                <Text fontSize="sm" color="brand.500">
                    Added: {added.toLocaleDateString()}
                </Text>
                <Spacer />
                <Box ref={ref} />
            </CardFooter>
        </Card>
    )
}

export default GoalCard