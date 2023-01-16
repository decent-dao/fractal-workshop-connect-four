import { Context, ReactNode, createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { Store } from './types';
import { gameReducer } from './game/reducer';
import { gameInitialState, seasonInitialState } from './constants';
import { seasonReducer } from './season/reducer';
import { useConnectFourSeason } from './season/hooks/useConnectFourSeason';
import { useConnectFourListeners } from './game/hooks/useConnectFourListeners';

const StoreContext = createContext<Store>({} as Store);
export const useStore = (): Store => useContext(StoreContext as Context<Store>)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentGame, gameDispatch] = useReducer(gameReducer, gameInitialState);
  const [currentSeason, seasonDispatch] = useReducer(seasonReducer, seasonInitialState);

  useConnectFourSeason({ currentSeason, seasonDispatch })
  useConnectFourListeners({ currentSeason, seasonDispatch, gameDispatch })
  const value = useMemo(() => ({
    currentSeason,
    currentGame
  }), [currentGame, currentSeason])
  return <StoreContext.Provider value={value as Store}>{children}</StoreContext.Provider>;
} 