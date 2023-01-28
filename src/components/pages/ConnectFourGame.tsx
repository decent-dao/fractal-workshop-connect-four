import { Grid, GridItem } from '@chakra-ui/react'
import { Branding } from '../ui/Branding'
import { TeamInfo } from '../ui/TeamInfo'
import { Board } from '../board/Board'

export function ConnectFourGame() {
  const largeScreen = `
  "brand tOne board tTwo"
`
  const smallScreen = `
    "brand brand"
    "tOne tTwo"
    "board board"
  `

  return (
    <Grid
      gridTemplateAreas={{ 'min1000': smallScreen, 'min1920': largeScreen }}
      rowGap={0}
      templateColumns={{
        'min1000': 'repeact(2, 1fr)',
        'min1920': 'minmax(300px, 412px) minmax(200px, 412px) 1fr minmax(200px, 412px)',
      }}
      templateRows={{ 'min1000': '5rem 10rem 1fr', 'min1920': 'calc(100vh)' }}
    >
      <GridItem area='brand' bg='black.900-semi-transparent'>
        <Branding />
      </GridItem>
      <GridItem area='tOne'>
        <TeamInfo teamNum={1} />
      </GridItem>
      <GridItem area='board'>
        <Board />
      </GridItem>
      <GridItem area='tTwo'>
        <TeamInfo teamNum={2} />
      </GridItem>
    </Grid>
  )
}
