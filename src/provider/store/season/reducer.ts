import { seasonInitialState } from './../constants';
import { SeasonAction, SeasonActions } from './actions';
import { Season } from './../types';

export const seasonReducer = (state: Season, action: SeasonActions) => {
  switch (action.type) {
    case SeasonAction.SET_SEASON:
      return { ...state, ...action.payload }
    case SeasonAction.UPDATE_GAME_IDS: {
      const gameIds = new Array(action.payload.toNumber() + 1).fill(undefined).map((_, i) => {
        return i + 1
      })
      return { ...state, gameIds }
    }
    case SeasonAction.RESET:
      return seasonInitialState
    default:
      return state;
  }
}