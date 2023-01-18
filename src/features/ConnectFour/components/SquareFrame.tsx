import { ReactNode } from 'react'
import { ConnectSquare } from '../types'
import { Box, Center } from '@chakra-ui/react'

export function SquareFrame({ square, children }: { square: ConnectSquare; children?: ReactNode }) {
  const isOutOfBounds = square.location.includes('x')
  return (
    <Box
      id={square.location}
      key={square.location}
      position='relative'
      >
      <Center
        boxSize="7rem"
        zIndex={0}
        border={square.color ? '24px solid': undefined}
        borderColor="#369af8ad"
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
            boxShadow: !isOutOfBounds ? '0px 0px 0px 18px #369af8ad, 0px 0px 0px 24px #369af8ff' : undefined
          },
        }}>
        {children}
      </Center>
    </Box>
  )
}
