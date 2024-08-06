import { FormControl, FormLabel, FormErrorMessage, Select } from '@chakra-ui/react'

function FormSelect({ label, register, children, w, ...rest }) {
    return (
        <FormControl w={w}>
            <FormLabel fontWeight={400} fontSize="sm" mb={0.5} color="brand.600">
                {label}
            </FormLabel>
            <Select bg="white" borderRadius={12} {...register} {...rest}>
                {children}
            </Select>
        </FormControl>
    )
}

export default FormSelect