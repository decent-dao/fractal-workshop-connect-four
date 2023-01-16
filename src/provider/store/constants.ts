import { constants } from 'ethers';
import { Game, Season, Store } from './types';


export const gameInitialState: Game = {
  gameId: null,
  teamOne: null,
  teamTwo: null,
  turn: 0,
  winner: constants.AddressZero,
  states: {
    isGameLoading: true,
    isMoveLoading: false,
    isGameOver: false,
  }
}

export const seasonInitialState: Season = {
  currentSeasonAddress: import.meta.env.VITE_CURRENT_SEASON_ADDRESS,
  connectFourContract: null,
  gameIds: []
}

export const storeInitialState: Store = {
  currentGame: gameInitialState,
  currentSeason: seasonInitialState
}