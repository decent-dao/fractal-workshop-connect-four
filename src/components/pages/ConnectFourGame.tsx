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
    "board empty"
    "board tOne"
    "board tTwo"
  `

  return (
    <Grid
      gridTemplateAreas={{ starting: smallScreen, '3xl': largeScreen }}
      rowGap={{ starting: 8, '3xl': 0 }}
      templateColumns={{
        starting: 'repeact(2, 1fr)',
        '3xl': 'minmax(300px, 412px) minmax(200px, 412px) 1fr minmax(200px, 412px)',
      }}
      templateRows={{ starting: '5rem 4rem repeat(2, 1fr)', '3xl': 'calc(100vh)' }}
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
