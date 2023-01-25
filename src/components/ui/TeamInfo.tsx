import { Box, Flex, Text } from '@chakra-ui/react'
import { constants } from 'ethers'
import { useStore } from '../../provider/store/StoreProvider'
import { rotateAnimation } from '../../utils/animation'
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
  const winningTeamNum = winner === teamOne.full ? 1 : 2

  return (
    <Box
      pt={{ starting: 8, '3xl': 32 }}
      pr={{ starting: 0, '3xl': 0 }}
      mx={8}
    >
      <Box bg={winningTeamNum === teamNum ? 'gold.500' : undefined} rounded="lg">
        <Flex
          gap={4}
          mt={winningTeamNum === teamNum ? '4' : undefined}
          justifyContent={{ starting: 'center', '3xl': 'flex-start' }}
          flexDirection={{ starting: 'row', '3xl': 'column' }}
          alignItems={{ starting: 'center', '3xl': 'center' }}
        >
          <Text textStyle='text-4xl-mono-bold' color={winningTeamNum === teamNum ? 'grayscale.black' : 'grayscale.white'}>{displayName}</Text>
          <Coin
            boxSize={{ starting: 20, '3xl': 40 }}
            animation={isCurrentTurn && !isGameOver ||  winningTeamNum === teamNum ? rotateAnimation : 'none'}
          />
        </Flex>
        {winningTeamNum === teamNum && (
          <Box pb={4} textAlign="center">
            <Text textStyle="text-6xl-mono-bold" color="grayscale.black">Winner!</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
