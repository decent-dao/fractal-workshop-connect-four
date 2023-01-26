import { ReactNode } from 'react'
import { ConnectSquare } from '../../types'
import { Box } from '@chakra-ui/react'

export function SquareFrame({ square, children }: { square: ConnectSquare; children?: ReactNode }) {
  return (
    <Box
      border='1px solid'
      borderColor='black.500'
      id={square.location}
      key={square.location}
      position='relative'
    >
      <Box
        boxSize={{ starting: '6rem', '3xl': '8rem' }}
        sx={{
          '&': {
            marginInlineStart: '0px',
            WebkitMarginStart: '0px !important',
          },
          '&:before': {
            border: { starting: '16px solid', '3xl': '20px solid' },
            borderColor: square.connected
              ? { starting: 'gold.500-active', '3xl': 'gold.500' }
              : { starting: 'gold.500', '3xl': 'gold.500' },
            boxSize: '100%',
            content: '""',
            position: 'absolute',
          },
          '&:after': {
            boxShadow: {
              starting: '0px 0px 0px 17px #fabd2eff',
              '3xl': '0px 0px 0px 20px #fabd2eff',
            },
            borderRadius: '100%',
            boxSize: { starting: '65%', '3xl': '70%' },
            content: '""',
            left: '50%',
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
