import React from 'react'
import ReactDOM from 'react-dom/client'
import { Web3Provider } from './provider/web3/Web3Provider'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@decent-org/fractal-ui'
import { StoreProvider } from './provider/store/StoreProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './features/routes/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3Provider>
      <ChakraProvider theme={theme}>
        <StoreProvider>
          <RouterProvider router={router} />
        </StoreProvider>
      </ChakraProvider>
    </Web3Provider>
  </React.StrictMode>,
)
