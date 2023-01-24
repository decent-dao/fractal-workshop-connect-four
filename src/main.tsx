import React from 'react'
import ReactDOM from 'react-dom/client'
import { Web3Provider } from './provider/web3/Web3Provider'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@decent-org/fractal-ui'
console.log('🚀 ~ file: main.tsx:6 ~ theme', theme)
import { StoreProvider } from './provider/store/StoreProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

export const updatedTheme = {
  ...theme,
  breakpoints: { ...theme.breakpoints, starting: '0px', '3xl': '1500px' },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3Provider>
      <ChakraProvider theme={updatedTheme}>
        <StoreProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="bottom-center"
            closeButton={false}
            newestOnTop={false}
            pauseOnFocusLoss={false}
          />
        </StoreProvider>
      </ChakraProvider>
    </Web3Provider>
  </React.StrictMode>,
)
