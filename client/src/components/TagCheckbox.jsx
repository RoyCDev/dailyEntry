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
            <Tag {...getLabelProps()}
                colorScheme={state.isChecked ? "brand" : null}
                _hover={{ bg: state.isChecked ? "brand.600" : "gray.200" }}
                variant={state.isChecked ? "solid" : "subtle"}>
                {children}
            </Tag>
        </chakra.label>
    )
}

export default TagCheckbox