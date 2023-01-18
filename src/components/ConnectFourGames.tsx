import { Button, Flex, SkeletonText, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { constants } from 'ethers'
import { useEffect, useState } from 'react'
import { useConnectFourGame } from '../provider/store/hooks/useConnectFourGame'
import { useStore } from '../provider/store/StoreProvider'
import { GameBase } from '../provider/store/types'

export function ConnectFourGames() {
  const { currentSeason: { gameIds}} = useStore()
  return (
    <TableContainer>

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
          {gameIds.map((gameId) => <TableBodyRow key={gameId} gameId={gameId} />)}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export function TableBodyRow({ gameId }: { gameId: number }) {
  const [game, setGame] = useState<GameBase>()
  const {currentSeason} = useStore()
  const {getGameData} = useConnectFourGame({currentSeason})

  useEffect(() => {
    const retrieveGameData = async () => {
      const game = await getGameData(gameId)
      setGame(game)
    }
    retrieveGameData()
  }, [getGameData, gameId])

  if(!game) {
    return null
  }


  return (
    <Tr>
      <Td>{game.gameId}</Td>
      <Td>
        <SkeletonText isLoaded={!!game.teamOne.displayName} startColor="grayscale.200">
          {game.teamOne.displayName}
        </SkeletonText>
      </Td>

      <Td>

        <SkeletonText isLoaded={!!game.teamTwo.displayName} startColor="grayscale.200">
          {game.teamTwo.displayName}
        </SkeletonText>
      </Td>

      <Td>{game.winner !== constants.AddressZero ? 'Game Over' : 'In progress'}</Td>
      <Td isNumeric>{game.turn}</Td>
      <Td>
        <Flex justifyContent="flex-end">
          <Button variant='secondary'>View Game</Button>
        </Flex>
      </Td>
    </Tr>
  )
}