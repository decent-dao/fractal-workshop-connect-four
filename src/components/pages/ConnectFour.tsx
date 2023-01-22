import { Flex, Box } from '@chakra-ui/react'
import { useRef } from 'react'
import { SquareFrame } from '../board/SquareFrame'
import { SquareCenter } from '../board/SquareCenter'
import { AnimatedChip } from '../board/AnimatedChip'
import { useStore } from '../../provider/store/StoreProvider'
import { useParams } from 'react-router-dom'
import { useConnectFourGame } from '../../hooks/connectFour/useConnectFourGame'
import { VersusBadge } from '../ui/VersusBadge'
import { SquareRow } from '../board/SquareRow'

export function ConnectFour() {
  const {
    currentSeason: { currentGame },
  } = useStore()

  const { gameId } = useParams()
  useConnectFourGame({ gameId })
  const animatedChipRef = useRef<HTMLDivElement>(null)

  if (!currentGame) {
    return null
  }

  return (
    <Flex flexDirection='column' alignItems='center'>
      <VersusBadge />
      <Flex justifyContent='center' h='full'>
        <Box position='relative' overflow='hidden' h='fit-content'>
          {currentGame.board.map((row, i) => {
            return (
              <SquareRow
                key={i}
                index={i}
              >
                {row.map((square) => {
                  return (
                    <SquareFrame key={square.location} square={square}>
                      <AnimatedChip square={square} ref={animatedChipRef} />
                      <SquareCenter square={square} animatedChipRef={animatedChipRef} />
                    </SquareFrame>
                  )
                })}
              </SquareRow>
            )
          })}
        </Box>
      </Flex>
    </Flex>
  )
}
