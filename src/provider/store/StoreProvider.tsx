import { Context, ReactNode, createContext, useContext, useMemo, useReducer } from 'react';
import { Store } from './types';
import { seasonInitialState } from './constants';
import { seasonReducer } from './season/reducer';
import { useConnectFourSeason } from './hooks/useConnectFourSeason';
import { useConnectFourListeners } from './hooks/useConnectFourListeners';

const StoreContext = createContext<Store>({} as Store);
export const useStore = (): Store => useContext(StoreContext as Context<Store>)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentSeason, seasonDispatch] = useReducer(seasonReducer, seasonInitialState);

  useConnectFourSeason({ currentSeason, seasonDispatch })
  useConnectFourListeners({ currentSeason, seasonDispatch })
  const value = useMemo(() => ({
    currentSeason
  }), [currentSeason])
  return <StoreContext.Provider value={value as Store}>{children}</StoreContext.Provider>;
} 