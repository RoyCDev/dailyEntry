import FormInput from './FormInput'
import { useForm } from 'react-hook-form'
import { Button, Text, HStack, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { entryClient, toastConfig } from '../../util.js'

function LoginForm({ toggleMode, toast }) {
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

    const onSubmit = async (inputs) => {
        try {
            const res = await entryClient.post(`/auth/login`, inputs)
            toast({ ...toastConfig("success"), description: res.data.message })
            navigate("/entry")
        }
        catch (e) {
            toast({ ...toastConfig("error"), description: e.response.data.message })
        }
    }

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
            <Button type="submit" w="100%" colorScheme="brand" borderRadius={12} my={12}>
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