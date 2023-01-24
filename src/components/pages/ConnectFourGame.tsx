import { Grid, GridItem } from '@chakra-ui/react'
import { Branding } from '../ui/Branding'
import { TeamInfo } from '../ui/TeamInfo'
import { ConnectFour } from './ConnectFour'

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
      gridTemplateAreas={{ starting: smallScreen, '3xl': largeScreen }}
      templateColumns={{
        starting: 'repeact(2, 1fr)',
        '3xl': 'minmax(300px, 412px) minmax(200px, 412px) 1fr minmax(200px, 412px)',
      }}
      templateRows={{ starting: '10rem 5rem calc(100vh - 15rem)', '3xl': 'calc(100vh)' }}
    >
      <GridItem area='brand' bg='black.900-semi-transparent'>
        <Branding />
      </GridItem>
      <GridItem area='tOne'>
        <TeamInfo teamNum={1} />
      </GridItem>
      <GridItem area='board'>
        <ConnectFour />
      </GridItem>
      <GridItem area='tTwo'>
        <TeamInfo teamNum={2} />
      </GridItem>
    </Grid>
  )
}
