import FormInput from './FormInput'
import { useForm } from 'react-hook-form'
import { VStack, Button } from '@chakra-ui/react'
import entryClient from '../../util.js'

function LoginForm({ toggleMode }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onTouched" })

    const onSubmit = async (inputs) => {
        const res = await entryClient.post(`/auth/login`, inputs)
        console.log(res.data)
    }

    return (
        <form action="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
                <FormInput label="Username" type="text" name="username"
                    register={register}
                    validation={{ required: "please enter a username" }}
                    message={errors.username?.message} />
                <FormInput label="Password" type="password" name="password"
                    register={register}
                    validation={{
                        required: "please enter a password",
                        minLength: 6
                    }}
                    message={errors.password?.message} />
            </VStack>
            <Button type="submit" w="100%" colorScheme="brand" borderRadius={12} my={12}>
                Login
            </Button>
            <p>Don't have an account? <span onClick={toggleMode}>Create One</span></p>
        </form>
    )
}

export default LoginForm