import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react'

function FormInput({ label, register, message, ...rest }) {
    return (
        <FormControl isInvalid={!!message}>
            <FormLabel fontWeight={400} fontSize="sm" mb={0.5} color="brand.600">
                {label}
            </FormLabel>
            <Input bg="white" borderRadius={12} {...register} {...rest} />
            <FormErrorMessage>{message}</FormErrorMessage>
        </FormControl>
    )
}

export default FormInput