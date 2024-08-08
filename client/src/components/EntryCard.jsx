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

const moodColors = [
    "red", "red", "red",
    "yellow", "yellow", "yellow",
    "green", "green", "green", "green"
]

function EntryCard({ entry, onModalOpen }) {
    const color = moodColors[entry.mood - 1]

    return (
        <Card w="100%" variant="outline" borderRadius={12}>
            <CardBody px={7} pt={3}>
                {entry.date} <br />
                {entry.description}
            </CardBody>

            <CardFooter alignItems="center" pr={2.5} py={1.5} mt="auto">
                <Tag colorScheme={color}>{entry.mood}/10</Tag>
                <Spacer />
                <ButtonGroup variant="ghost" size="sm" spacing={0}>
                    <Button leftIcon={<EditIcon />} fontWeight="400">
                        Edit
                    </Button>
                    <Button leftIcon={<DeleteIcon />} fontWeight="400"
                        onClick={() => onModalOpen(entry)}>
                        Delete
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default EntryCard