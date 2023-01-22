import { SeasonAction, SeasonActions } from '../season/actions';
import { useWeb3NetworkConfig } from '../../web3/Web3Provider';
import { Season } from '../types';
import { Dispatch, useEffect, useCallback } from 'react';

interface IUseConnectFourSeason {
  currentSeason: Season
  seasonDispatch: Dispatch<SeasonActions>
}

export function useConnectFourSeason({ seasonDispatch }: IUseConnectFourSeason) {
  const { baseContracts } = useWeb3NetworkConfig()

  const retrieveSeason = useCallback(async () => {
    if (!baseContracts) {
      return;
    }
    const seasons = await baseContracts.connectFourFactoryBase.getGames()
    if (!seasons.length) {
      return;
    }
    const connectFourContract = baseContracts.connectFourBase.attach(seasons[0])
    const currentGameId = await connectFourContract.gameId()
    const gameIds = new Array(currentGameId.toNumber()).fill(undefined).map((_, i) => i);
    return {
      connectFourContract,
      gameIds
    }
  }, [baseContracts])

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