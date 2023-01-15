import { constants } from 'ethers';
import { Game, Season, Store } from './types';


export const gameInitialState: Game = {
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
  currentSeasonAddress: '0xc6CC49E491A2c7a18df0515f0E0a7E9720EB74a1',
  connectFourContract: null,
  gameIds: []
}

export const storeInitialState: Store = {
  currentGame: gameInitialState,
  currentSeason: seasonInitialState
}