import { seasonInitialState } from './../constants';
import { SeasonAction, SeasonActions } from './actions';
import { Season, GameStates } from './../types';
import { constants } from 'ethers';

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
    case SeasonAction.SET_GAME: {
      const { winner } = action.payload;
      const states: GameStates = {
        isGameLoading: false,
        isGameOver: winner !== constants.AddressZero,
        isMoveLoading: false,
      }
      return { ...state, currentGame: { ...action.payload, states } };
    }
    case SeasonAction.UPDATE_TURN: {
      const { gameId } = action.payload
      if (!state.currentGame || gameId !== state.currentGame.gameId) {
        // if event is for a different game ignore
        return state;
      }
      // otherwise update current game
      const states: GameStates = {
        ...state.currentGame.states,
        isMoveLoading: true, // this is one being updated
      }
      // starts an animation that will call another function to set the piece in place on board
      return { ...state, currentGame: { ...state.currentGame, states } };
    }
    case SeasonAction.UPDATE_MOVE_FINISHED: {
      if (!state.currentGame) {
        // for typescript, logic should never hit here
        return state;
      }
      const states: GameStates = {
        ...state.currentGame.states,
        isMoveLoading: false, // this is one being updated
      }
      return { ...state, currentGame: { ...state.currentGame, states, board: action.payload.board } };
    }
    case SeasonAction.UPDATE_WINNER: {
      const { gameId } = action.payload
      if (!state.currentGame || gameId !== state.currentGame.gameId) {
        // if event is for a different game ignore
        return state;
      }
      return {...state, currentGame: {...state.currentGame, winner: action.payload.winningAddress}};
    }
    case SeasonAction.GAME_RESET:
      return seasonInitialState
    default:
      return state;
  }
}