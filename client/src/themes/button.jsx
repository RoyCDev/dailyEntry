import { defineStyle, defineStyleConfig, withDefaultColorScheme } from '@chakra-ui/react'

// colorScheme = "brand"
const submit = defineStyle({
    color: "white",
    bg: "brand.500",
    _hover: { bg: "brand.600" },
    _active: { bg: "brand.700" },
    fontWeight: 600,
    w: "100%"
})

export const buttonTheme = defineStyleConfig({
    baseStyle: {
        fontWeight: 400,
        borderRadius: 12
    },
    variants: { submit },
})