import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    HStack,
    Spacer,
    Tag,
    Text,
    useDisclosure
} from '@chakra-ui/react'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import GoalDeleteModal from './GoalDeleteModal'

function Goal({ goal, onDelete }) {
    const priorityColors = {
        high: "green",
        mid: "yellow",
        low: "red"
    }
    const color = priorityColors[goal.priority]
    const added = new Date(goal.added_date)

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Card w="100%" variant="outline" borderRadius={12}>
            <HStack px={4} pt={3} alignItems="start">
                <Checkbox iconSize={16} size="xl" variant="circular" colorScheme="brand" />
                <CardBody pt={1}>{goal.description}</CardBody>
                <Tag colorScheme={color}>{goal.priority} priority</Tag>
            </HStack>

            <CardFooter alignItems="center" pr={2.5} py={2}>
                <Text fontSize="sm" color="brand.500">
                    Added: {added.toLocaleDateString()}
                </Text>
                <Spacer />
                <Button variant="ghost" fontWeight="400" size="sm"
                    leftIcon={<EditIcon />}>
                    Edit
                </Button>
                <Button variant="ghost" fontWeight="400" size="sm"
                    leftIcon={<DeleteIcon />}
                    onClick={() => onDelete(goal.id)}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Goal