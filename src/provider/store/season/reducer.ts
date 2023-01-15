import { seasonInitialState } from './../constants';
import { SeasonAction, SeasonActions } from './actions';
import { Season } from './../types';

export const seasonReducer = (state: Season, action: SeasonActions) => {
  switch (action.type) {
    case SeasonAction.SET_SEASON:
      return { ...state, ...action.payload }
    case SeasonAction.RESET:
      return seasonInitialState
    default:
      return state;
  }
}