import FormSelect from './FormSelect'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    HStack,
    Spacer,
    Text,
    Textarea
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { entryClient } from "../../util.js"

function GoalForm({ ...rest }) {
    const {
        register,
        handleSubmit,
        resetField,
        watch,
        formState: { errors }
    } = useForm()

    const queryClient = useQueryClient()

    const { mutate: onSubmit } = useMutation({
        mutationFn: async (inputs) => {
            return await entryClient.post("/goals", inputs)
        },
        onSuccess: () => {
            resetField("desc")
            resetField("priority")
            queryClient.invalidateQueries({ queryKey: ["goals"] })
        }
    })

    const status = watch("isCompleted") ? "completed" : "ongoing"

    return (
        <Card w="100%" variant="outline" borderRadius={12} {...rest}>
            <HStack px={4} pt={3} alignItems="start">
                <Checkbox iconSize={16} size="xl" variant="circular" colorScheme="brand"
                    {...register("isCompleted")} />
                <CardBody px={3} py={0}>
                    <Textarea resize="none" rows={2}
                        placeholder='Add a new goal'
                        {...register("desc", { required: true })} />
                </CardBody>

                <FormSelect size="sm" w="fit-content" placeholder="Priority"
                    register={{ ...register("priority", { required: true }) }}>
                    <option value="high">High</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </FormSelect>
            </HStack>

            <CardFooter alignItems="center" pr={2.5} py={1.5}>
                <Text fontSize="sm" color="gray.500">
                    Status: {status}
                </Text>
                <Spacer />
                <Button leftIcon={<AddIcon />} fontWeight="400"
                    onClick={handleSubmit(onSubmit)}
                    variant="ghost" size="sm">
                    Create
                </Button>
            </CardFooter>
        </Card >
    )
}

export default GoalForm