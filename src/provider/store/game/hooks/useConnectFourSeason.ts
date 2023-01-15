import { SeasonAction, SeasonActions } from './../../season/actions';
import { useWeb3NetworkConfig } from '../../../web3/Web3Provider';
import { Season } from '../../types';
import { Dispatch, useEffect, useCallback } from 'react';

interface IUseConnectFourSeason {
  currentSeason: Season
  seasonDispatch: Dispatch<SeasonActions>
}

export function useConnectFourSeason({ currentSeason, seasonDispatch }: IUseConnectFourSeason) {
  const { baseContracts } = useWeb3NetworkConfig()

  const retrieveSeason = useCallback(async () => {
    if (!baseContracts) {
      return;
    }

    const connectFourContract = baseContracts.connectFourBase.attach(currentSeason.currentSeasonAddress)
    const currentGameId = await connectFourContract.gameId()
    const gameIds = new Array(currentGameId).map((_, i) => i + 1);
    return {
      connectFourContract,
      gameIds
    }
  }, [baseContracts, currentSeason.currentSeasonAddress])

  useEffect(() => {
    retrieveSeason().then((currentSeason) => {

      if (!currentSeason) {
        return;
      }
      seasonDispatch({
        type: SeasonAction.SET_SEASON,
        payload: currentSeason
      })
    })
  }, [retrieveSeason, seasonDispatch])
}