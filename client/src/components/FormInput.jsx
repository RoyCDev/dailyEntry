import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react'

function FormInput({ label, type, name, register, validation = {}, message }) {
    return (
        <FormControl isInvalid={!!message}>
            <FormLabel fontWeight={400} fontSize="sm" mb={0.5} color="brand.600">
                {label}
            </FormLabel>
            <Input type={type} bg="white" borderRadius={12} {...register(name, validation)} />

            <FormErrorMessage>{message}</FormErrorMessage>
        </FormControl>
    )
}

export default FormInput