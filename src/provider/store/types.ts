import { Dispatch } from 'react'
import { ConnectSquare } from '../../types'
import { AddressInfo } from './../../hooks/utils/useAddressLookup'
import { ConnectFour } from '@fractal-framework/fractal-demos-contracts/typechain'
import { SeasonActions } from './season/actions'

export interface Store {
  currentSeason: Season
  dispatch: Dispatch<SeasonActions>
}

export interface Season {
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
  lastTurnData?: {
    lastColumn: number,
    teamNum: number
    lastRow: number,
  }
}

export type GameBaseData = Game;
export type GameBase = Omit<GameBaseData, 'board'>