export enum GameAction {
  UPDATE_TURN, // isMoveLoading -> true
  UPDATE_WINNER,
  SET_GAME, // isGameLoading -> false
  RESET
}

export type GameActions = { type: GameAction.RESET }