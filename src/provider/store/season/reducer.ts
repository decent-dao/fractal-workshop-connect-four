import { seasonInitialState } from './../constants';
import { SeasonAction, SeasonActions } from './actions';
import { Season, GameStates, GameTempData } from './../types';
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
      const { gameId, column, teamAddress } = action.payload
      if (!state.currentGame || gameId !== state.currentGame.gameId) {
        // @todo find game in games array and update
        return state;
      }
      const { teamOne, board } = state.currentGame    
      // otherwise update current game
      const teamNumber = teamAddress === teamOne.full ? 1 : 2

      // this boolean allows for the 'animation' of the chip falling into place to start
      const states: GameStates = {
        ...state.currentGame.states,
        isMoveLoading: true, // this is one being updated
      }

      // this will set temporary data about the move made by team
      // this will be deleted when move is finished
      const temp: GameTempData = {
            actionTurnTaken: {
              turnColumn: column,
              turnTeamNumber: teamNumber
            }
      }

      // temporary update board with chip on outofbounds row
      const tempBoard = [...board]
      tempBoard[0][column] = {
        ...tempBoard[0][column],
        team: teamNumber
      };

      return { ...state, currentGame: { ...state.currentGame, board: tempBoard, states, temp } };
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
      return { ...state, currentGame: { ...state.currentGame, states, board: action.payload.board, temp: undefined } };
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