import FormInput from "../components/FormInput"
import FormSelect from "../components/FormSelect"
import ActivityForm from "../components/ActivityForm"
import {
    Button,
    HStack,
    Grid,
    GridItem,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react"
import { InfoIcon } from '@chakra-ui/icons'

import { useQuery, useMutation } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom"
import { entryClient } from "../../util.js"

function EntryPage() {
    const navigate = useNavigate()
    const { id } = useParams()

    const { data: entry, isPending } = useQuery({
        queryKey: ["entry", id],
        queryFn: async () => {
            const res = await entryClient.get(`/entries/${id}`)
            return res.data.entry
        },
        refetchOnWindowFocus: false,
        enabled: !!id
    })

    const {
        register,
        handleSubmit,
        getValues,
        resetField,
        formState: { errors }
    } = useForm({
        values: {
            diary: entry?.description || "",
            date: entry?.date || null,
            rating: entry?.mood || null,
            newActivity: "",
            activities: entry?.activities || []
        }
    })

    const { mutate: onSubmit } = useMutation({
        mutationFn: async (inputs) => {
            return id ?
                await entryClient.post("/entries", inputs) :
                await entryClient.put(`/entries/${id}`, inputs)
        },
        onSuccess: () => navigate("/history")
    })

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

    const submitButton = (display) => (
        <Button type="submit" display={display}
            w="100%" colorScheme="brand" borderRadius={12} mt={6}>
            {id ? "Edit" : "Create"} Entry
        </Button>
    )

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(20, 1fr)"
                gap={{ base: 5, lg: "2vw", xl: "3vw" }} maxW="62em" m="0 auto">
                <GridItem colSpan={{ base: 20, lg: 12, xl: 13 }} order={{ base: 2, lg: 1 }}>
                    <Textarea bg="white" resize="none" borderRadius={12}
                        minH={{ base: "300px", lg: "600px" }}
                        h={{ lg: "90vh" }}
                        {...register("diary", { required: true })} />

                    {submitButton({ lg: "none" })}
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

                    <ActivityForm register={register} getValues={getValues} resetField={resetField} />
                    {submitButton({ base: "none", lg: "inline-flex" })}
                </GridItem>
            </Grid>
        </form>
    )
}

export default EntryPage