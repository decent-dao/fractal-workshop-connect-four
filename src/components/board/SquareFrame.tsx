import { ReactNode } from 'react'
import { ConnectSquare } from '../../types'
import { Box } from '@chakra-ui/react'

export function SquareFrame({ square, children }: { square: ConnectSquare; children?: ReactNode }) {
  return (
    <Box
      id={square.location}
      key={square.location}
      position='relative'
      border='1px solid'
      borderColor='black.500'
    >
      <Box
        boxSize={{ starting: '7rem', '3xl': '8rem' }}
        sx={{
          '&': {
            WebkitMarginStart: '0px !important',
            marginInlineStart: '0px',
          },
          '&:before': {
            content: '""',
            boxSize: '100%',
            border: { starting: '18px solid', '3xl': '20px solid' },
            borderColor: { starting: 'gold.500', '3xl': 'gold.500' },
            position: 'absolute',
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            boxSize: '65%',
            top: '50%',
            left: '50%',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)',
            boxShadow: square.connected
              ? { starting: '0px 0px 0px 18px #4da9ffff', '3xl': '0px 0px 0px 20px #4da9ffff' }
              : { starting: '0px 0px 0px 18px #fabd2eff', '3xl': '0px 0px 0px 20px #fabd2eff' },
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
