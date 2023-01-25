import { seasonInitialState } from './../constants'
import { SeasonAction, SeasonActions } from './actions'
import { Season } from './../types'

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
      const { turn, board, lastTurnData } = action.payload
      let lastRow = 0
      if (lastTurnData && turn > 0) {
        lastRow = [...board]
          .reverse()
          .reduce((prev, cur, i) => (cur[lastTurnData.lastColumn].team ? i : prev), 0)
      }
      return {
        ...state,
        currentGame: {
          ...action.payload,
          lastTurnData: lastTurnData ? { ...lastTurnData, lastRow } : undefined,
        },
      }
    }
    case SeasonAction.UPDATE_TURN: {
      const { gameId, column, teamAddress } = action.payload
      if (!state.currentGame || gameId !== state.currentGame.gameId) {
        return state
      }
      const { teamOne, board } = state.currentGame
      const teamNum = teamAddress === teamOne.full ? 1 : 2

      const lastRow: number = [...board]
        .reverse()
        .reduce((prev, cur, i) => (cur[column].team ? i + 1 : prev), 0)
      const lastTurnData = {
        lastColumn: column,
        lastRow: lastRow,
        teamNum,
      }

      const newBoard = board.map((row) =>
        row.map((square) => {
          if (square.location === `${lastRow}:${column}`) {
            return {
              ...square,
              team: teamNum,
            }
          }
          return square
        }),
      )

      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          turn: state.currentGame.turn + 1,
          board: newBoard,
          lastTurnData,
        },
      }
    }
    case SeasonAction.UPDATE_WINNER: {
      const { gameId } = action.payload
      if (!state.currentGame || gameId !== state.currentGame.gameId) {
        return state
      }
      return {
        ...state,
        currentGame: { ...state.currentGame, winner: action.payload.winningAddress },
      }
    }
    case SeasonAction.GAME_RESET:
      return seasonInitialState
    default:
      return state
  }
}
