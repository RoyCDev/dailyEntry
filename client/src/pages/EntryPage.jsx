import FormInput from "../components/FormInput"
import FormSelect from "../components/FormSelect"
import TagCheckbox from "../components/TagCheckbox"
import {
    Button,
    Flex,
    HStack,
    Grid,
    GridItem,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react"
import { InfoIcon } from '@chakra-ui/icons'

import { useRef } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { entryClient } from "../../util.js"

function EntryPage() {
    const ref = useRef()
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        getValues,
        resetField,
        formState: { errors }
    } = useForm()

    const onSubmit = (inputs) => {
        console.log(inputs)
    }

    const { data: activities } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const res = await entryClient.get("/entries/activity")
            return res.data.activities
        },
        refetchOnWindowFocus: false
    })

    const addActivity = (e) => {
        if (e.keyCode !== 13) return;

        e.preventDefault()
        const newActivity = getValues("newActivity")?.toLowerCase()
        queryClient.setQueryData(["activities"], (prev) => (
            prev.includes(newActivity) ? prev : [...prev, newActivity]
        ))
        resetField("newActivity")
    }

    const renderedActivities = activities?.map((activity) => (
        <TagCheckbox key={activity}
            name="activities"
            value={activity}
            register={{ ...register("activities") }}>
            {activity}
        </TagCheckbox>
    ))

    const options = [
        "it's the worst",
        "very sad",
        "sad",
        "meh",
        "neutral",
        "okay",
        "good",
        "very good",
        "great",
        "really great"
    ]

    const renderedOptions = options.map((option, i) => {
        const rating = i + 1
        return <option key={rating} value={rating}>{rating} - {option}</option>
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(20, 1fr)"
                gap={{ base: 5, lg: "2vw", xl: "3vw" }} maxW="62em" m="0 auto">
                <GridItem colSpan={{ base: 20, lg: 12, xl: 13 }} order={{ base: 2, lg: 1 }}>
                    <Textarea bg="white" resize="none" borderRadius={12}
                        minH={{ base: "300px", lg: "600px" }}
                        h={{ lg: "90vh" }}
                        {...register("diary", { required: true })} />

                    <Button type="submit" display={{ lg: "none" }}
                        w="100%" colorScheme="brand" borderRadius={12} mt={6}>
                        Create Entry
                    </Button>
                </GridItem>

                <GridItem colSpan={{ base: 20, lg: 8, xl: 7 }} order={{ base: 1, lg: 2 }}>
                    <HStack fontSize="xl">
                        <InfoIcon /> <Text>Details</Text>
                    </HStack>

                    <VStack mt={1} mb={2} pt={2} pb={4} borderY="1px solid gray">
                        <FormInput size="sm" label="Date" type="date"
                            register={{ ...register("date", { required: true }) }} />
                        <FormSelect size="sm" label="Mood Rating"
                            placeholder="Choose mood"
                            register={{ ...register("rating", { required: true }) }}>
                            {renderedOptions}
                        </FormSelect>
                    </VStack>

                    <FormInput size="sm" label="Activities" type="text"
                        placeholder="+ Add a new activity"
                        register={{ ...register("newActivity") }}
                        onKeyDown={addActivity} />
                    <Flex gap={1.5} mt={3} wrap="wrap">{renderedActivities}</Flex>

                    <Button type="submit" display={{ base: "none", lg: "inline-flex" }}
                        w="100%" colorScheme="brand" borderRadius={12} mt={12}>
                        Create Entry
                    </Button>
                </GridItem>
            </Grid>
        </form>
    )
}

export default EntryPage