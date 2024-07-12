import { FormControl, FormLabel, Input } from '@chakra-ui/react'

function FormInput({ label, type, name, register }) {
    return (
        <FormControl>
            <FormLabel fontWeight={400} mb={0.5}>{label}</FormLabel>
            <Input type={type} bg="white" borderRadius={12} {...register(name)} />
        </FormControl>
    )
}

export default FormInput