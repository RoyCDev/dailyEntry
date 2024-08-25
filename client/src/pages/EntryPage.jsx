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
    VStack,
    Show,
    Hide
} from "@chakra-ui/react"
import { InfoIcon } from '@chakra-ui/icons'

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom"
import { entryClient } from "../../util.js"

function SubmitButton({ id }) {
    return (
        <Button type="submit" variant="submit" mt={6}>
            {id ? "Save Changes" : "Create Entry"}
        </Button>
    )
}

function EntryPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { id } = useParams()

    const { data: entry, isPending } = useQuery({
        queryKey: ["entry", id],
        queryFn: async () => {
            const res = await entryClient.get(`/entries/${id}`)
            return res.data.entry
        },
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!id
    })

    if (!isPending && !entry) navigate(-1)

    const {
        register,
        handleSubmit,
        getValues,
        resetField,
        formState: { errors }
    } = useForm({
        values: {
            description: entry?.description || "",
            date: entry?.date.slice(0, 10) || null,
            mood: entry?.mood || null,
            newActivity: "",
            activities: entry?.activities || []
        }
    })

    const { mutate: onSubmit } = useMutation({
        mutationFn: async (inputs) => {
            return id ?
                await entryClient.put(`/entries/${id}`, inputs) :
                await entryClient.post("/entries", inputs)
        },
        onSuccess: () => {
            if (id) queryClient.invalidateQueries({ queryKey: ["entry", id] })
            navigate("/history")
        }
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(20, 1fr)"
                gap={{ base: 5, lg: "2vw", xl: "3vw" }} maxW="62em" m="0 auto">
                <GridItem colSpan={{ base: 20, lg: 12, xl: 13 }} order={{ base: 2, lg: 1 }}>
                    <Textarea bg="white" resize="none" borderRadius={12}
                        minH={{ base: "300px", lg: "600px" }}
                        h={{ lg: "90vh" }}
                        {...register("description", { required: true })} />

                    <Hide above="lg"><SubmitButton id={id} /></Hide>
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
                            register={{ ...register("mood", { required: true }) }}>
                            {renderedOptions}
                        </FormSelect>
                    </VStack>

                    <ActivityForm register={register} getValues={getValues} resetField={resetField} />
                    <Show above="lg"><SubmitButton id={id} /></Show>
                </GridItem>
            </Grid>
        </form>
    )
}

export default EntryPage