import { chakra, useCheckbox, Tag } from '@chakra-ui/react'

function TagCheckbox({ children, name, value, register }) {
    const {
        state,
        getCheckboxProps,
        getInputProps,
        getLabelProps,
        htmlProps
    } = useCheckbox({ name, value, ...register })

    return (
        <chakra.label {...htmlProps}>
            <input type="checkbox" {...getInputProps()}{...getCheckboxProps()} hidden />
            <Tag {...getLabelProps()} px={3} borderRadius="full"
                colorScheme="brand"
                _hover={{ bg: state.isChecked ? "brand.600" : "blackAlpha.100" }}
                variant={state.isChecked ? "solid" : "outline"}>
                {children}
            </Tag>
        </chakra.label>
    )
}

export default TagCheckbox