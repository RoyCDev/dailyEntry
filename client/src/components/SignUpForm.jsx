import FormInput from './FormInput.jsx'
import { useForm } from 'react-hook-form'
import { Button, Text, HStack, VStack } from '@chakra-ui/react'
import { useMutation } from "@tanstack/react-query"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { entryClient } from '../../util.js'

function SignUpForm({ toggleMode }) {
    const schema = yup.object({
        username: yup.string().required(),
        email: yup.string().email("invalid email format").required(),
        password: yup
            .string()
            .required()
            .min(6)
            .matches(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/,
                "password must contain at least 1 uppercase, 1 lowercase, and a number"
            )
    })

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onTouched", resolver: yupResolver(schema) })

    const { mutate: onSubmit } = useMutation({
        mutationFn: async (inputs) => {
            return await entryClient.post(`/auth/signup`, inputs)
        },
        onSuccess: () => toggleMode()
    })

    return (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
                <FormInput label="Username" type="text"
                    register={{ ...register("username") }}
                    message={errors.username?.message} />
                <FormInput label="Email" type="email"
                    register={{ ...register("email") }}
                    message={errors.email?.message} />
                <FormInput label="Password" type="password"
                    register={{ ...register("password") }}
                    message={errors.password?.message} />
            </VStack>
            <Button type="submit" variant="submit" my={12}>
                Sign Up
            </Button>
            <HStack gap={1}>
                <Text>Already have an account?</Text>
                <Text onClick={toggleMode} as="u" cursor="pointer">
                    Login
                </Text>
            </HStack>
        </form>
    )
}

export default SignUpForm