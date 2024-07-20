import FormInput from "../components/FormInput"
import { useForm } from "react-hook-form"
import { HStack, Select } from "@chakra-ui/react"
import entryClient from "../../util.js"

function GoalForm({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <HStack>
                <FormInput type="text"
                    placeholder="+ Add a new goal"
                    register={{ ...register("desc") }} />

                <Select bg="white" borderRadius={12} w="150px"
                    {...register("priority", { required: true })}
                    placeholder="Priority">
                    <option value="high">High</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </Select>
            </HStack>
        </form>
    )
}

export default GoalForm