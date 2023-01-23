import { Dispatch, useEffect, useCallback } from 'react';
import { SeasonActions, SeasonAction } from '../../provider/store/season/actions';
import { Season } from '../../provider/store/types';
import { useWeb3NetworkConfig } from '../../provider/web3/Web3Provider';

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
    const connectFourContract = baseContracts.connectFourBase
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