import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Spacer,
    Tag
} from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const moodColors = [
    "red", "red", "red",
    "yellow", "yellow", "yellow",
    "green", "green", "green", "green"
]

function EntryCard({ entry, onModalOpen }) {
    const navigate = useNavigate()
    const color = moodColors[entry.mood - 1]

    return (
        <Card w="100%" variant="outline" borderRadius={12}>
            <CardBody pt={3}>
                {entry.description}
            </CardBody>

            <CardFooter alignItems="center" pr={2.5} py={1.5} mt="auto">
                <Tag colorScheme={color}>{entry.mood}/10</Tag>
                <Spacer />
                <ButtonGroup variant="ghost" size="sm" spacing={0}>
                    <Button leftIcon={<EditIcon />}
                        onClick={() => navigate(`/entry/${entry.id}`)}>
                        Edit
                    </Button>
                    <Button leftIcon={<DeleteIcon />}
                        onClick={() => onModalOpen(entry)}>
                        Delete
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default EntryCard