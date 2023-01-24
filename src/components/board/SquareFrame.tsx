import { ReactNode } from 'react'
import { ConnectSquare } from '../../types'
import { Box, Center } from '@chakra-ui/react'

export function SquareFrame({ square, children }: { square: ConnectSquare; children?: ReactNode }) {
  const isOutOfBounds = square.location.includes('x')
  return (
    <Box
      id={square.location}
      key={square.location}
      position='relative'
      border={!isOutOfBounds ? '2px solid' : undefined}
      borderColor="grayscale.black"
    >
      <Center
        w='8.5rem'
        h={isOutOfBounds ? '0rem' : '8.5rem'}
        zIndex={0}
        border={!isOutOfBounds ? '24px solid' : 'none'}
        borderColor={{ starting: 'gold.500', '3xl': 'gold.500' }}
        sx={{
          '&': {
            WebkitMarginStart: '0px !important',
            marginInlineStart: '0px',
          },
          '&:before': {
            content: '""',
            paddingBottom: '50%',
            position: 'absolute',
            boxSize: '65%',
            top: '50%',
            left: '50%',
            zIndex: 8,
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)',
            boxShadow: !isOutOfBounds ? '0px 0px 0px 20px #c897251c, 0px 0px 0px 24px #fabd2eff' : undefined
          },
        }}>
        {children}
      </Center>
    </Box>
  )
}
