import FormInput from './FormInput.jsx'
import { useForm } from 'react-hook-form'
import { Button, VStack } from '@chakra-ui/react'
import entryClient from '../../util.js'

function SignUpForm({ toggleMode }) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onTouched" })

    const onSubmit = async (inputs) => {
        const res = await entryClient.post(`/auth/signup`, inputs)
        console.log(res.data)
    }

    return (
        <form action="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={4}>
                <FormInput label="Username" type="text" name="username"
                    register={register}
                    validation={{ required: "this field is required" }}
                    message={errors.username?.message} />
                <FormInput label="Email" type="email" name="email"
                    register={register}
                    validation={{
                        required: "this field is required",
                        pattern: {
                            value: /[A-Z0-9a-z._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,64}/,
                            message: "invalid email format"
                        }
                    }}
                    message={errors.email?.message} />
                <FormInput label="Password" type="password" name="password"
                    register={register}
                    validation={{
                        required: "this field is required",
                        minLength: { value: "6", message: "at least 6 characters" },
                        pattern: {
                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/,
                            message: "must contain at least 1 uppercase, 1 lowercase, and a number"
                        }
                    }}
                    message={errors.password?.message} />
            </VStack>
            <Button type="submit" w="100%" colorScheme="brand" borderRadius={12} my={12}>
                Sign Up
            </Button>

            <p>Already have an account? <span onClick={toggleMode}>Login</span>
            </p>
        </form>
    )
}

export default SignUpForm