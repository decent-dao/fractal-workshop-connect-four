import { GameBase } from './../types';
import { useCallback } from 'react';
import { useAddressLookup } from './../../../hooks/utils/useAddressLookup';
import { Season } from '../types';

interface IUseConnectFourGame {
  currentSeason: Season
}

export function useConnectFourGame({ currentSeason }: IUseConnectFourGame) {
  const { lookupAddress } = useAddressLookup()
  const getGameData = useCallback(async (gameId: number): Promise<GameBase | undefined> => {
    if (!currentSeason.connectFourContract) {
      return;
    }
    try {

      const {teamOne, teamTwo, ...rest} = await currentSeason.connectFourContract.getGame(gameId);
      return {
        ...rest, 
        gameId,
        teamOne: await lookupAddress(teamOne),
        teamTwo: await  lookupAddress(teamTwo),
      };
    } catch {
      console.error('🚀 There was a problem retreiving game')
    }
  }, [currentSeason, lookupAddress])

    const getGameAndBoardData = useCallback(async (gameId: number) => {
      if (!currentSeason.connectFourContract) {
        return;
      }
      try {
  
        const gameData = getGameData(gameId);
        const board = await currentSeason.connectFourContract.getGameBoard(gameId);
        return {
            
          ...gameData, 
          board
        };
      } catch {
        console.error('🚀 There was a problem retreiving game')
      }
    }, [currentSeason, getGameData])


  return { getGameData, getGameAndBoardData };
}