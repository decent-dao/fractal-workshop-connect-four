import {
  Alert,
  AlertTitle,
  Button,
  Flex,
  Grid,
  GridItem,
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
import { Check, CloseX, Copy, Info } from '@decent-org/fractal-ui'
import { constants } from 'ethers'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import { useCopyText } from '../../hooks/utils/useCopyText'
import { useConnectFourGame } from '../../hooks/connectFour/useConnectFourGame'
import { useStore } from '../../provider/store/StoreProvider'
import { GameBase } from '../../provider/store/types'
import { Branding } from '../ui/Branding'
import { SeasonAction } from '../../provider/store/season/actions'

const smallScreen = `
  "brand"
  "table"
`
const largeScreen = `
  "brand table"
`

export function ConnectFourGames() {
  const {
    currentSeason: { gameIds, connectFourContract, currentGame},
    dispatch
  } = useStore()
  const copyTextToClipboard = useCopyText()
  useEffect(() => {
    if(currentGame) {
      dispatch({
        type: SeasonAction.GAME_RESET
      })
    }
  }, [currentGame, dispatch])
  return (
    <Grid
      gridTemplateAreas={{ starting: smallScreen, '3xl': largeScreen }}
      templateColumns={{
        starting: 'minmax(1fr, 72rem)',
        '3xl': 'minmax(300px, 412px) 1fr',
      }}
      templateRows={{ starting: '5rem 10rem 1fr', '3xl': 'calc(100vh)' }}
    >
      <GridItem area='brand' bg='black.900-semi-transparent'>
        <Branding />
      </GridItem>
      <GridItem area='table'>
        <TableContainer m={8}>
          <Alert status='info' w='w-full' my={4}>
            <Info boxSize='24px' />
            <AlertTitle>
              <Text textStyle='text-lg-mono-medium' my={4}>
                For Instructions on how to start a game and play see
                <Link
                  ml={2}
                  color='blue.400'
                  href='https://github.com/curiousity-labs/fractal-workshop-connect-four'
                >
                  README
                </Link>
              </Text>
            </AlertTitle>
          </Alert>

          <Flex
            alignItems='center'
            bg='black.900-semi-transparent'
            flexDirection='column'
            gap={2}
            mb={4}
            p={4}
            rounded='lg'
          >
            <Text textStyle='text-lg-mono-bold'>Current Game Address:</Text>
            <Text
              alignItems='center'
              bg='black.900-semi-transparent'
              border='1px solid'
              borderColor='gold.500'
              color='gold.500'
              cursor='pointer'
              display='flex'
              letterSpacing='0.125rem'
              gap='4'
              onClick={() => copyTextToClipboard(connectFourContract?.address)}
              px={4}
              py={2}
              rounded='lg'
              textStyle='text-base-mono-bold'
            >
              <Copy /> {connectFourContract?.address}
            </Text>
          </Flex>

          <Table variant='striped' bg='black.900-semi-transparent' rounded='lg'>
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
      </GridItem>
    </Grid>
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
          <Link href={game.teamOne.addressURL!} rel='nooppener noreferer' target='_blank'>
            <Flex
              alignItems='center'
              color={!isGameOver ? undefined : isTeamOneWinner ? 'green.500' : 'alert-red.normal'}
              gap={4}
            >
              <Text>{game.teamOne.displayName}</Text>
              {!isGameOver ? null : isTeamOneWinner ? <Check /> : <CloseX />}
            </Flex>
          </Link>
        </SkeletonText>
      </Td>

      <Td>
        <SkeletonText isLoaded={!!game.teamTwo.displayName} startColor='grayscale.200'>
          <Link href={game.teamTwo.addressURL!} rel='nooppener noreferer' target='_blank'>
            <Flex
              alignItems='center'
              color={!isGameOver ? undefined : isTeamTwoWinner ? 'green.500' : 'alert-red.normal'}
              gap={4}
            >
              <Text>{game.teamTwo.displayName}</Text>
              {!isGameOver ? null : isTeamTwoWinner ? <Check /> : <CloseX />}
            </Flex>
          </Link>
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
