import { Flex, Badge, Skeleton, Text, keyframes } from '@chakra-ui/react'
import { constants } from 'ethers'
import { CHIP_COLORS } from '../../constants'
import { useStore } from '../../provider/store/StoreProvider'
import { motion } from 'framer-motion'

const animationKeyframesLeft = keyframes`
  0% { transform: scale(1); border-color: #fabd2e00 }
  50% { transform: scale(1.10); border-color: #fabd2eff }
  100% { transform: scale(1); border-color: #fabd2e00 }
`

const animationLeft = `${animationKeyframesLeft} 2s linear infinite`

const animationKeyframesRight = keyframes`
  0% { transform: scale(1); border-color: #fabd2e00 }
  50% { transform: scale(1.10); border-color: #fabd2eff }
  100% { transform: scale(1); border-color: #fabd2e00 }
`

const animationRight = `${animationKeyframesRight} 1s ease-in-out infinite`

export function VersusBadge() {
  const {
    currentSeason: { currentGame },
  } = useStore()
  if (!currentGame) {
    return <Skeleton startColor='grayscale.200' w='full' />
  }
  const { winner, teamOne, teamTwo, turn } = currentGame
  const currentTeamTurn = turn % 2 == 0 ? 2 : 1
  const isGameOver = winner !== constants.AddressZero
  const isTeamOneWinner = winner === teamOne.full
  const isTeamTwoWinner = winner === teamTwo.full
  
  return (
    <Flex
      m={4}
      gap={8}
      bg={!isGameOver ? 'black.900-semi-transparent' : 'green.500'}
      alignItems='center'
      justifyContent='center'
      w='full'
      p={8}
      rounded='lg'
    >
      <Badge
        as={motion.div}
        animation={currentTeamTurn === 1 && !isGameOver ? animationLeft : undefined}
        border='4px solid'
        borderColor='transparent'
        rounded='lg'
        position="relative"
        sx={CHIP_COLORS[0]}
        px={2}
      >
        {isTeamOneWinner && <Text>Winner</Text>}
        <Text textStyle='text-xl-mono-bold'>{teamOne.displayName}</Text>
      </Badge>
      <Badge bg='transparent' color='white'>
        <Text textStyle='text-2xl-mono-regular'>VS</Text>
      </Badge>
      <Badge
        as={motion.div}
        animation={currentTeamTurn === 2 && !isGameOver ? animationRight : undefined}
        border='4px solid'
        borderColor='transparent'
        position="relative"
        rounded='lg'
        sx={CHIP_COLORS[1]}
        px={2}
        >
        {isTeamTwoWinner && <Text>Winner</Text>}
        <Text textStyle='text-xl-mono-bold'>{teamTwo.displayName}</Text>
      </Badge>
    </Flex>
  )
}
