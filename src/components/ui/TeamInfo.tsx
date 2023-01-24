import { Flex, keyframes, Text } from '@chakra-ui/react'
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

  const { teamOne, teamTwo, turn } = currentGame

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

  const rotateCoin = keyframes`
    0% { transform: rotateY(0deg)}
    100% { transform: rotateY(360deg)}
  `

  const rotateAnimation = `${rotateCoin} ease-out 3s 1s infinite`

  return (
    <Flex
      flexDirection={{ starting: 'row', '3xl': 'column' }}
      justifyContent={{ starting: 'center', '3xl': 'flex-start' }}
      alignItems='center'
      pt={{ starting: 10, '3xl': 24 }}
      mb={{ starting: 8, '3xl': 0 }}
      gap={4}
    >
      <Text textStyle='text-5xl-mono-bold'>{displayName}</Text>
      <Coin
        boxSize={{ starting: 24, '3xl': 32 }}
        animation={isCurrentTurn ? rotateAnimation : 'none'}
      />
    </Flex>
  )
}
