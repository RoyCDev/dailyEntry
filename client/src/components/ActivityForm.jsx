import FormInput from "./FormInput"
import TagCheckbox from "./TagCheckbox"
import { Flex } from "@chakra-ui/react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { entryClient } from "../../util"

function ActivityForm({ register, getValues, resetField }) {
    const queryClient = useQueryClient()

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
            value={activity}
            register={{ ...register("activities") }}>
            {activity}
        </TagCheckbox>
    ))

    return (
        <>
            <FormInput size="sm" label="Activities" type="text"
                placeholder="+ Add a new activity"
                register={{ ...register("newActivity") }}
                onKeyDown={addActivity} />
            <Flex gap={1.5} mt={3} mb={{ lg: 6 }} wrap="wrap">
                {renderedActivities}
            </Flex>
        </>
    )
}

export default ActivityForm