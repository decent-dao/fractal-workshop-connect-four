import { Season } from '../types';
import { GameAction, GameActions } from '../game/actions';
import { Dispatch, useCallback } from 'react';

interface IUseConnectFourGame {
  season: Season
  gameDispatch: Dispatch<GameActions>
}

export function useConnectFourGame({ season, gameDispatch }: IUseConnectFourGame) {

  const getGameData = useCallback(async (gameId: number) => {
    if (!season.connectFourContract) {
      return;
    }
    try {

      const game = await season.connectFourContract.getGame(gameId);
      return game;
    } catch {
      console.error('🚀 There was a problem retreiving game')
    }
  }, [season])

  const retreiveAndStoreGameData = useCallback(async (gameId: number) => {
    const game = getGameData(gameId);
    if (!game) {
      gameDispatch({
        type: GameAction.RESET
      })
      return;
    }
  }, [getGameData, gameDispatch])

  return { retreiveAndStoreGameData, getGameData };
}