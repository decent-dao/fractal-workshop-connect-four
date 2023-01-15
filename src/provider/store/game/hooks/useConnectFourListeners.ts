import { GameActions } from '../actions';
import { Dispatch } from 'react';

interface IUseListeners {
  gameDispatch: Dispatch<GameActions>
}

export function useListeners({ gameDispatch  }: IUseListeners) {
  // @todo game created listener
  // @todo turn listener
  // @todo game finished listener
  return;
}