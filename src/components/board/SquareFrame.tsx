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
      border='1px solid'
      borderColor={!isOutOfBounds ? 'black.500' : 'transparent'}
    >
      <Center
        w='7rem'
        h={isOutOfBounds ? '0rem' : '7rem'}
        zIndex={0}
        borderY={!isOutOfBounds ? '18px solid' : undefined}
        borderX={!isOutOfBounds ? '18px solid' : '18px solid'}
        borderColor={!isOutOfBounds ? { starting: 'gold.500', '3xl': 'gold.500' } : 'transparent'}
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
            boxShadow: !isOutOfBounds ? '0px 0px 0px 20px #fabd2eff' : undefined
          },
        }}>
        {children}
      </Center>
    </Box>
  )
}
