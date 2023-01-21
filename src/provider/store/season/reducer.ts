import { seasonInitialState } from './../constants';
import { SeasonAction, SeasonActions } from './actions';
import { Season } from './../types';

export const seasonReducer = (state: Season, action: SeasonActions) => {
  switch (action.type) {
    case SeasonAction.SET_SEASON:
      return { ...state, ...action.payload }
    case SeasonAction.UPDATE_GAME_IDS: {
      const gameIds = new Array(action.payload.toNumber() + 1).fill(undefined).map((_, i) => {
        return i
      })
      return { ...state, gameIds }
    }
    case SeasonAction.SET_GAME: {
      return { ...state, currentGame: { ...action.payload } };
    }
    case SeasonAction.UPDATE_TURN: {
      const { gameId, column, teamAddress } = action.payload
      if (!state.currentGame || gameId !== state.currentGame.gameId) {
        // @todo find game in games array and update
        return state;
      }
      const { teamOne, board } = state.currentGame    
      // otherwise update current game
      const teamNumber = teamAddress === teamOne.full ? 1 : 2

      // temporary update board with chip on outofbounds row
      const tempBoard = [...board]
      tempBoard[0][column] = {
        ...tempBoard[0][column],
        team: teamNumber
      };

      return { ...state, currentGame: { ...state.currentGame, board: tempBoard } };
    }
    case SeasonAction.UPDATE_MOVE_FINISHED: {
      if (!state.currentGame) {
        // for typescript, logic should never hit here
        return state;
      }

      return { ...state, currentGame: { ...state.currentGame, turn: state.currentGame.turn++, board: action.payload.board, temp: undefined } };
    }
    case SeasonAction.UPDATE_WINNER: {
      const { gameId } = action.payload
      if (!state.currentGame || gameId !== state.currentGame.gameId) {
        // @todo find game in games array and update
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