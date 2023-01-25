import { Flex, keyframes, Text } from '@chakra-ui/react'
import { constants } from 'ethers'
import { useStore } from '../../provider/store/StoreProvider'
import { TeamOneCoin } from '../icons/TeamOneCoin'
import { TeamTwoCoin } from '../icons/TeamTwoCoin'

export function TeamInfo({ teamNum }: { teamNum: number }) {
  const {
    currentSeason: { currentGame },
  } = useStore()
  if (!currentGame) {
    return null
  }

  const { teamOne, teamTwo, turn, winner } = currentGame

  const { Coin, displayName } =
    teamNum === 1
      ? {
          Coin: TeamOneCoin,
          displayName: teamOne.displayName,
        }
      : {
          Coin: TeamTwoCoin,
          displayName: teamTwo.displayName,
        }

  const currentTeamTurn = turn % 2 == 0 ? 2 : 1
  const isCurrentTurn = currentTeamTurn === teamNum
  const isGameOver = winner !== constants.AddressZero
  // const isTeamOneWinner = winner === teamOne.full
  // const isTeamTwoWinner = winner === teamTwo.full

  const rotateCoin = keyframes`
    0% { transform: rotateY(0deg)}
    50% { transform: rotateY(90deg)}
    100% { transform: rotateY(0deg)}
  `

  const rotateAnimation = `${rotateCoin} ease-out 2s 1s infinite`

  return (
    <Flex
      flexDirection={{ starting: 'row', '3xl': 'column' }}
      alignItems={{ starting: 'center', '3xl': 'center' }}
      pt={{ starting: 0, '3xl': 32 }}
      pr={{ starting: 0, '3xl': 0 }}
      justifyContent={{ starting: 'center', '3xl': 'flex-start' }}
      w="full"
      h="full"
      gap={4}
    >
      <Text textStyle='text-4xl-mono-bold'>{displayName}</Text>
      <Coin
        boxSize={{ starting: 20, '3xl': 32 }}
        animation={isCurrentTurn && !isGameOver ? rotateAnimation : 'none'}
      />
    </Flex>
  )
}
