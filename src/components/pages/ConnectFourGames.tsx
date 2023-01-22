import {
  Button,
  Flex,
  Link,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Check, CloseX, Copy } from '@decent-org/fractal-ui'
import { constants } from 'ethers'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { useCopyText } from '../../hooks/utils/useCopyText'
import { useConnectFourGame } from '../../hooks/connectFour/useConnectFourGame'
import { useStore } from '../../provider/store/StoreProvider'
import { GameBase } from '../../provider/store/types'

export function ConnectFourGames() {
  const {
    currentSeason: { gameIds, currentSeasonAddress },
  } = useStore()
  const copyTextToClipboard = useCopyText()
  return (
    <TableContainer maxW='6xl' mx='auto'>
      <Flex gap={2} alignItems='center'>
        <Text textStyle='text-base-mono-medium'>Current Season Address:</Text>
        <Text
          textStyle='text-base-mono-bold'
          color='grayscale.white'
          bg='black.900'
          px={4}
          py={2}
          rounded='md'
          gap='4'
          letterSpacing='0.125rem'
          cursor='pointer'
          display='flex'
          alignItems='center'
          onClick={() => copyTextToClipboard(currentSeasonAddress || '')}
        >
          <Copy /> {currentSeasonAddress}
        </Text>
      </Flex>
      <Text textStyle='text-lg-mono-semibold' my={4}>
        For Instructions on how to start a game and play see
        <Link
          ml={2}
          color='blue.400'
          href='https://github.com/curiousity-labs/fractal-workshop-connect-four'
        >
          README
        </Link>
      </Text>
      <Table variant='striped'>
        <Thead textStyle='text-base-mono-bold'>
          <Tr>
            <Th>Game Id</Th>
            <Th>Team One</Th>
            <Th>Team Two</Th>
            <Th>game Status</Th>
            <Th isNumeric>current Turn</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody textStyle='text-lg-sans-regular'>
          {gameIds.map((gameId) => (
            <TableBodyRow key={gameId} gameId={gameId} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export function TableBodyRow({ gameId }: { gameId: number }) {
  const [game, setGame] = useState<GameBase>()
  const { getGameData } = useConnectFourGame({})
  const navigate = useNavigate()

  const isTeamOneWinner = game?.winner === game?.teamOne.full

  const isTeamTwoWinner = game?.winner === game?.teamTwo.full

  const isGameOver = game?.winner !== constants.AddressZero

  useEffect(() => {
    const retrieveGameData = async () => {
      const game = await getGameData(gameId)
      setGame(game)
    }
    retrieveGameData()
  }, [getGameData, gameId])

  if (!game || game.teamOne.full === constants.AddressZero) {
    return null
  }

  return (
    <Tr>
      <Td>{game.gameId}</Td>
      <Td>
        <SkeletonText isLoaded={!!game.teamOne.displayName} startColor='grayscale.200'>
          <Flex
            alignItems='center'
            gap={4}
            color={!isGameOver ? undefined : isTeamOneWinner ? 'green.500' : 'alert-red.normal'}
          >
            <Text>{game.teamOne.displayName}</Text>
            {!isGameOver ? null : isTeamOneWinner ? <Check /> : <CloseX />}
          </Flex>
        </SkeletonText>
      </Td>

      <Td>
        <SkeletonText isLoaded={!!game.teamTwo.displayName} startColor='grayscale.200'>
          <Flex
            alignItems='center'
            gap={4}
            color={!isGameOver ? undefined : isTeamTwoWinner ? 'green.500' : 'alert-red.normal'}
          >
            <Text>{game.teamTwo.displayName}</Text>
            {!isGameOver ? null : isTeamTwoWinner ? <Check /> : <CloseX />}
          </Flex>
        </SkeletonText>
      </Td>

      <Td>{game.winner !== constants.AddressZero ? 'Game Over' : 'In progress'}</Td>
      <Td isNumeric>{game.turn}</Td>
      <Td>
        <Flex justifyContent='flex-end'>
          <Button variant='secondary' onClick={() => navigate(ROUTES.game.relative(game.gameId))}>
            View Game
          </Button>
        </Flex>
      </Td>
    </Tr>
  )
}