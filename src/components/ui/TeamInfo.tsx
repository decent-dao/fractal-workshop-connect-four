import { Box, Flex, Text } from '@chakra-ui/react'
import { constants } from 'ethers'
import { useStore } from '../../provider/store/StoreProvider'
import { rotateAnimation } from '../../utils/animation'
import { Star } from '../icons/Star'
import { TeamOneCoinF } from '../icons/TeamOneCoinF'
import { TeamTwoCoinD } from '../icons/TeamTwoCoinD'

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
          Coin: TeamOneCoinF,
          displayName: teamOne.displayName,
        }
      : {
          Coin: TeamTwoCoinD,
          displayName: teamTwo.displayName,
        }

  const currentTeamTurn = turn % 2 == 0 ? 2 : 1
  const isCurrentTurn = currentTeamTurn === teamNum
  const isGameOver = winner !== constants.AddressZero
  const winningTeamNum = !isGameOver ? null : winner === teamOne.full ? 1 : 2

  return (
    <Box
      pt={{ min0: 4, min1000: 4, min1920: 36 }}
      px={{ min0: 0, min600: 4, min1920: 0 }}
      mx={{ min0: 0, min1000: 8, min1920: 8 }}
    >
      <Box bg={winningTeamNum === teamNum ? 'gold.500' : undefined} rounded='lg' p={2}>
        <Flex
          alignItems={{ min0: 'center', min1000: 'center', min1920: 'center' }}
          flexDirection={{ min0: 'row', min1000: 'row', min1920: 'column' }}
          gap={4}
          justifyContent={{ min0: 'space-between', min1000: 'center', min1920: 'flex-start' }}
        >
          <Text
            color={winningTeamNum === teamNum ? 'grayscale.black' : 'grayscale.white'}
            textStyle={{
              min0: 'text-base-mono-bold',
              min400: 'text-2xl-mono-bold',
              min1000: 'text-4xl-mono-bold',
              min1920: 'text-4xl-mono-bold',
            }}
          >
            {displayName}
          </Text>
          <Coin
            animation={
              isCurrentTurn && !isGameOver
                ? rotateAnimation
                : isGameOver && winningTeamNum === teamNum
                ? rotateAnimation
                : 'none'
            }
            boxSize={{ min0: 8, min400: 12, min600: 16, min1000: 16, min1920: 40 }}
          />
        </Flex>
        {winningTeamNum === teamNum && (
          <Flex pb={4} alignItems='center' justifyContent='center' gap={{ min0: 4, min600: 8 }}>
            <Star boxSize={{ min0: 4, min600: 8, min1000: 8, min1920: 10 }} />
            <Text
              textStyle={{
                min0: 'text-base-mono-bold',
                min400: 'text-2xl-mono-bold',
                min1000: 'text-2xl-mono-bold',
                min1920: 'text-6xl-mono-bold',
              }}
              color='grayscale.black'
            >
              Winner!
            </Text>
            <Star boxSize={{ min0: 4, min600: 8, min1000: 8, min1920: 10 }} />
          </Flex>
        )}
      </Box>
    </Box>
  )
}
