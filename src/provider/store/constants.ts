import { Season, Store } from './types';


export const seasonInitialState: Season = {
  connectFourContract: null,
  gameIds: [],
  currentGame: null,
}

export const storeInitialState: Omit<Store, 'dispatch'> = {
  currentSeason: seasonInitialState
}