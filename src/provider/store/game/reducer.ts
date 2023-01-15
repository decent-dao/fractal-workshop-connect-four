import { GameAction, GameActions } from './actions';
import { Game } from './../types';
import { gameInitialState } from '../constants';
export function gameReducer(state: Game, actions: GameActions) {
  switch (actions.type) {
    case GameAction.RESET:
      return gameInitialState;
    default:
      return state;
  }
}