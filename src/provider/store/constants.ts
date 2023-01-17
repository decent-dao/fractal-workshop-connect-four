import { Season, Store } from './types';


export const seasonInitialState: Season = {
  currentSeasonAddress: import.meta.env.VITE_CURRENT_SEASON_ADDRESS,
  connectFourContract: null,
  gameIds: [],
  currentGame: null,
}

export const storeInitialState: Store = {
  currentSeason: seasonInitialState
}