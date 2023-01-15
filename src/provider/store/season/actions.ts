import { Season } from './../types'
export enum SeasonAction {
  SET_SEASON,
  RESET,
}

export type SeasonActions =
  | { type: SeasonAction.RESET }
  | { type: SeasonAction.SET_SEASON; payload: Omit<Season, 'currentSeasonAddress'> }
