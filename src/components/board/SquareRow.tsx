import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BOARD_PADDING } from '../../constants'

export function SquareRow({ index, children }: { index: number; children: ReactNode }) {
  return (
    <Flex
      borderX={index !== 0 ? BOARD_PADDING : undefined}
      borderColor='blue.500'
      roundedTop={index === 1 ? 'xl' : undefined}
      roundedBottom={index === 6 ? 'xl' : undefined}
    >
      {children}
    </Flex>
  )
}
