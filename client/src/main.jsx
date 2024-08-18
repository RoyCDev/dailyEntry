import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.jsx'

import { checkboxTheme } from './themes/checkbox.jsx'
import { buttonTheme } from './themes/button.jsx'

import '@fontsource-variable/montserrat';

const theme = extendTheme({
  fonts: {
    heading: "Montserrat Variable, sans-serif",
    body: "Montserrat Variable, sans-serif"
  },
  colors: {
    brand: { 500: "#51645d", 600: "#41504a", 700: "#313c38" }
  },
  components: { Checkbox: checkboxTheme, Button: buttonTheme }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
