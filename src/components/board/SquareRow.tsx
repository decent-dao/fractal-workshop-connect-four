import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { BOARD_PADDING } from '../../constants'

export function SquareRow({ index, children }: { index: number; children: ReactNode }) {
  return (
    <Flex
      borderX={index !== 0 ? BOARD_PADDING : undefined}
      borderColor='blue.400-hover'
    >
      {children}
    </Flex>
  )
}
