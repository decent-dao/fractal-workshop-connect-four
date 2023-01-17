import { SeasonActions } from './../season/actions';
import { useAddressLookup } from './../../../hooks/utils/useAddressLookup';
import { Season } from '../types';
import { Dispatch, useCallback } from 'react';

interface IUseConnectFourGame {
  season: Season
  seasonDispatch: Dispatch<SeasonActions>
}

export function useConnectFourGame({ season }: IUseConnectFourGame) {
  const { lookupAddress } = useAddressLookup()
  const getGameData = useCallback(async (gameId: number) => {
    if (!season.connectFourContract) {
      return;
    }
    try {

      const {teamOne, teamTwo, ...rest} = await season.connectFourContract.getGame(gameId);
      const board = await season.connectFourContract.getGameBoard(gameId);
      return {
          
        ...rest, 
        teamOne: await lookupAddress(teamOne),
        teamTwo:await  lookupAddress(teamTwo),
        board
      };
    } catch {
      console.error('🚀 There was a problem retreiving game')
    }
  }, [season, lookupAddress])


  return { getGameData };
}