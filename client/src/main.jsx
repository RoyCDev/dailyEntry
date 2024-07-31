import React from 'react'
import ReactDOM from 'react-dom/client'
import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { ChakraProvider, extendTheme, createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'
import App from './App.jsx'

import '@fontsource-variable/montserrat';

// customizing checkbox theme
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

const checkboxTheme = defineMultiStyleConfig({ sizes, variants: { circular } })

const theme = extendTheme({
  fonts: {
    heading: "Montserrat Variable, sans-serif",
    body: "Montserrat Variable, sans-serif"
  },
  colors: {
    brand: { 500: "#51645d", 600: "#41504a", 700: "#313c38" }
  },
  components: { Checkbox: checkboxTheme }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
