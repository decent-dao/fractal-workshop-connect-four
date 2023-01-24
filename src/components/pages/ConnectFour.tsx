import { Flex, Box } from '@chakra-ui/react'
import { useRef } from 'react'
import { SquareFrame } from '../board/SquareFrame'
import { SquareCenter } from '../board/SquareCenter'
import { AnimatedChip } from '../board/AnimatedChip'
import { useStore } from '../../provider/store/StoreProvider'
import { useParams } from 'react-router-dom'
import { useConnectFourGame } from '../../hooks/connectFour/useConnectFourGame'
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
    <Flex
      justifyContent='center'
      h='full'
      pt={{ starting: '24', '3xl': '0' }}
      alignItems={{ starting: 'flex-start', '3xl': 'center' }}
    >
      <Box
        position='relative'
        overflow='hidden'
        h='fit-content'
        boxShadow='1px 1px 3px #fabd2e11, 4px 4px 6px #fabd2e11, 8px 8px 10px #fabd2e11, 16px 16px 18px #fabd2e11'
        rounded='md'
      >
        {currentGame.board.map((row, i) => {
          return (
            <SquareRow key={i} index={i}>
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
  )
}
