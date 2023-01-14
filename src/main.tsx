import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Web3Provider } from './provider/web3/Web3Provider'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@decent-org/fractal-ui'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3Provider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Web3Provider>
  </React.StrictMode>,
)
