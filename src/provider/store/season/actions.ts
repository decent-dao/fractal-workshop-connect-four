import { BigNumber } from 'ethers';
import { Season } from './../types'
export enum SeasonAction {
  SET_SEASON,
  UPDATE_TURN,
  UPDATE_GAME_IDS,
  RESET,
}

export type SeasonActions =
  | { type: SeasonAction.RESET }
  | { type: SeasonAction.SET_SEASON; payload: Omit<Season, 'currentSeasonAddress'> }
  | { type: SeasonAction.UPDATE_GAME_IDS; payload: BigNumber }
  | { type: SeasonAction.UPDATE_TURN; payload: number }
