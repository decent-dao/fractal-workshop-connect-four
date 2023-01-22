import { ConnectSquare } from './../../../features/ConnectFour/types';
import { BigNumber } from 'ethers';
import { GameBaseData, Season } from './../types'
export enum SeasonAction {
  // actions for setting season state
  SET_SEASON,
  UPDATE_GAME_IDS,
  // actions for setting game state
  UPDATE_TURN, // isMoveLoading -> true
  UPDATE_MOVE_FINISHED, // isMovingLoading -> false
  UPDATE_WINNER,
  SET_GAME, // isGameLoading -> false
  GAME_RESET, // used to reset Game
}

export type SeasonActions =
  | { type: SeasonAction.GAME_RESET }
  | { type: SeasonAction.SET_SEASON; payload: Omit<Season, 'currentGame'> }
  | { type: SeasonAction.UPDATE_GAME_IDS; payload: BigNumber }
  | { type: SeasonAction.UPDATE_TURN; payload: { gameId: number, teamAddress: string, column: number } }
  | { type: SeasonAction.UPDATE_MOVE_FINISHED, payload: { board: ConnectSquare[][] } }
  | { type: SeasonAction.UPDATE_WINNER; payload: { gameId: number, winningAddress: string } }
  | { type: SeasonAction.SET_GAME; payload: GameBaseData }
