import { Dispatch } from 'react'
import { ConnectSquare } from './../../features/ConnectFour/types'
import { AddressInfo } from './../../hooks/utils/useAddressLookup'
import { ConnectFour } from 'b3-curious-contracts/typechain'
import { SeasonActions } from './season/actions'

export interface Store {
  currentSeason: Season
  dispatch: Dispatch<SeasonActions>
}

export interface Season {
  currentSeasonAddress: string | null
  connectFourContract: ConnectFour | null
  gameIds: number[]
  currentGame: Game | null
}

export interface Game {
  gameId: number
  teamOne: AddressInfo
  teamTwo: AddressInfo
  turn: number
  winner: string
  board: ConnectSquare[][]
}

export type GameBaseData = Omit<Game, 'states'>
export type GameBase = Omit<Game, 'states' | 'board'>