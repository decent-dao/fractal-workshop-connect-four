import { Flex, Box } from '@chakra-ui/react'
import { useRef } from 'react'
import { SquareFrame } from '../board/SquareFrame'
import { SquareCenter } from '../board/SquareCenter'
import { ChipFalling } from '../board/ChipFalling'
import { useStore } from '../../provider/store/StoreProvider'
import { useParams } from 'react-router-dom'
import { useConnectFourGame } from '../../provider/store/hooks/useConnectFourGame'
import { VersusBadge } from '../ui/VersusBadge'

const BOARD_PADDING = '32px solid'

export function ConnectFour() {
  const { currentSeason: { currentGame } } = useStore()
  const { gameId } = useParams()
  useConnectFourGame({ gameId })
  const fallingChipRef = useRef<HTMLDivElement>(null)

  if (!currentGame) {
    return null
  }

  return (
    <Flex flexDirection="column" alignItems="center">
      <VersusBadge />
      <Flex justifyContent='center' h='full'>
        <Box position="relative" overflow="hidden" h="fit-content">
          {currentGame.board.map((row, i) => {
            return (
              <Flex
                key={i}
                borderX={i !== 0 ? BOARD_PADDING : undefined}
                borderColor='blue.500'
                roundedTop={i === 1 ? 'xl' : undefined}
                roundedBottom={i === 6 ? 'xl' : undefined}
              >
                {row.map((square) => {
                  return (
                    <SquareFrame key={square.location} square={square}>
                      <ChipFalling square={square} ref={fallingChipRef} />
                      <SquareCenter square={square} fallingChipRef={fallingChipRef} />
                    </SquareFrame>
                  )
                })}
              </Flex>
            )
          })}
        </Box>
      </Flex>
    </Flex>
  )
}
