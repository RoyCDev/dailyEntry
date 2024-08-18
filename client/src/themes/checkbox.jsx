import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const sizes = {
    xl: definePartsStyle({
        control: defineStyle({
            boxSize: 12
        }),
    }),
}
const circular = definePartsStyle({
    control: defineStyle({
        rounded: "full"
    })
})

export const checkboxTheme = defineMultiStyleConfig({
    sizes,
    variants: { circular }
})

