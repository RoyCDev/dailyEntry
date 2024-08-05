import FormInput from "../components/FormInput"
import TagCheckbox from "../components/TagCheckbox"
import { Select } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from 'react-hook-form'
import { entryClient } from "../../util.js"

function EntryPage() {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        formState: { errors }
    } = useForm()

    const { data: activities } = useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const res = await entryClient.get("/entries/activity")
            return res.data.activities
        }
    })

    const newActivity = watch("newActivity")
    const selectedActivities = watch("activities")

    const addActivity = (inputs) => {
        console.log(inputs)
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

    return (
        <form onSubmit={handleSubmit(addActivity)}>
            <FormInput size="sm" label="Activities" placeholder="+ Add a new activity"
                register={{ ...register("newActivity") }}
            />
            {renderedActivities}
        </form>
    )
}

export default EntryPage