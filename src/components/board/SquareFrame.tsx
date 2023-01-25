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
        boxSize='8rem'
        sx={{
          '&': {
            WebkitMarginStart: '0px !important',
            marginInlineStart: '0px',
          },
          '&:before': {
            content: '""',
            boxSize: '100%',
            border: '20px solid',
            borderColor: 'gold.500',
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
            boxShadow: '0px 0px 0px 20px #fabd2eff',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
