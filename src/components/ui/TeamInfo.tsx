import { Box, Flex, Text } from '@chakra-ui/react'
import { constants } from 'ethers'
import { useStore } from '../../provider/store/StoreProvider'
import { rotateAnimation } from '../../utils/animation'
import { Star } from '../icons/Star'
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
  const winningTeamNum = !isGameOver ? null : winner === teamOne.full ? 1 : 2

  return (
    <Box pt={{ 'min1000': 4, 'min1920': 32 }} pr={{ 'min1000': 0, 'min1920': 0 }} mx={8}>
      <Box bg={winningTeamNum === teamNum ? 'gold.500' : undefined} rounded='lg' p={2}>
        <Flex
          alignItems={{ 'min1000': 'center', 'min1920': 'center' }}
          flexDirection={{ 'min1000': 'row', 'min1920': 'column' }}
          gap={4}
          justifyContent={{ 'min1000': 'center', 'min1920': 'flex-start' }}
        >
          <Text
            color={winningTeamNum === teamNum ? 'grayscale.black' : 'grayscale.white'}
            textStyle='text-4xl-mono-bold'
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
            boxSize={{ 'min1000': 20, 'min1920': 40 }}
          />
        </Flex>
        {winningTeamNum === teamNum && (
          <Flex pb={4} alignItems='center' justifyContent='center' gap={8}>
            <Star boxSize={{ 'min1000': 8, 'min1920': 10 }} />
            <Text
              textStyle={{ 'min1000': 'text-2xl-mono-bold', 'min1920': 'text-6xl-mono-bold' }}
              color='grayscale.black'
            >
              Winner!
            </Text>
            <Star boxSize={{ 'min1000': 8, 'min1920': 10 }} />
          </Flex>
        )}
      </Box>
    </Box>
  )
}
