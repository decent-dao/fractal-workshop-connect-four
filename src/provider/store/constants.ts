import { Season, Store } from './types';


export const seasonInitialState: Season = {
  currentSeasonAddress: null,
  connectFourContract: null,
  gameIds: [],
  currentGame: null,
}

export const storeInitialState: Omit<Store, 'dispatch'> = {
  currentSeason: seasonInitialState
}