import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

export function SquareRow({ index, children }: { index: number; children: ReactNode }) {
  return (
    <Flex
      borderX={index !== 0 ? '1px solid' : undefined}
      borderColor="gold.500">
      {children}
    </Flex>
  )
}
