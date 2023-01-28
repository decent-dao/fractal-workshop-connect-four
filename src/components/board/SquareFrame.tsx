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
        boxSize={{ 'min1000': '6rem', 'min1920': '8rem' }}
        sx={{
          '&': {
            marginInlineStart: '0px',
            WebkitMarginStart: '0px !important',
          },
          '&:before': {
            border: { 'min1000': '16px solid', 'min1920': '20px solid' },
            borderColor: square.connected
              ? { 'min1000': 'gold.500-active', 'min1920': 'gold.500' }
              : { 'min1000': 'gold.500', 'min1920': 'gold.500' },
            boxSize: '100%',
            content: '""',
            position: 'absolute',
          },
          '&:after': {
            boxShadow: {
              'min1000': '0px 0px 0px 17px #fabd2eff',
              'min1920': '0px 0px 0px 20px #fabd2eff',
            },
            borderRadius: '100%',
            boxSize: { 'min1000': '65%', 'min1920': '70%' },
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
