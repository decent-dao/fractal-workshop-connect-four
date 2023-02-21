import React from 'react'
import ReactDOM from 'react-dom/client'
import { Web3Provider } from './provider/web3/Web3Provider'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@decent-org/fractal-ui'
import { StoreProvider } from './provider/store/StoreProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import '@fontsource/ibm-plex-mono';
import '@fontsource/ibm-plex-sans';

export const updatedTheme = {
  ...theme,
  breakpoints: {
    min0: '0px',
    min400: '525px',
    min600: '725px',
    min1000: '1000px',
    min1920: '1920px',
  },
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Web3Provider>
      <ChakraProvider theme={updatedTheme}>
        <StoreProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position='bottom-center'
            closeButton={false}
            newestOnTop={false}
            pauseOnFocusLoss={false}
          />
        </StoreProvider>
      </ChakraProvider>
    </Web3Provider>
  </React.StrictMode>,
)
