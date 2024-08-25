import FormInput from './FormInput'
import { useForm } from 'react-hook-form'
import { Button, Text, HStack, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from "@tanstack/react-query"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { entryClient } from '../../util.js'

function LoginForm({ toggleMode }) {
    const navigate = useNavigate()
    const schema = yup.object({
        username: yup.string().required(),
        password: yup.string().required()
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onTouched", resolver: yupResolver(schema) })

    const { mutate: onSubmit } = useMutation({
        mutationFn: async (inputs) => {
            return await entryClient.post(`/auth/login`, inputs)
        },
        onSuccess: () => navigate("/entry")
    })

    return (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
                <FormInput label="Username" type="text"
                    register={{ ...register("username") }}
                    message={errors.username?.message} />
                <FormInput label="Password" type="password"
                    register={{ ...register("password") }}
                    message={errors.password?.message} />
            </VStack>
            <Button type="submit" variant="submit" my={12}>
                Login
            </Button>
            <HStack gap={1}>
                <Text>Don't have an account?</Text>
                <Text onClick={toggleMode} as="u" cursor="pointer">
                    Create One
                </Text>
            </HStack>
        </form>
    )
}

export default LoginForm