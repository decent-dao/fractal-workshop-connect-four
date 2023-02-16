import { Dispatch, useEffect } from 'react';
import { TypedListener } from '@fractal-framework/fractal-demos-contracts/typechain/common';
import { BigNumber } from 'ethers';
import { GameCreatedEvent, GameFinishedEvent, TurnTakenEvent } from '@fractal-framework/fractal-demos-contracts/typechain/ConnectFour';
import { SeasonActions, SeasonAction } from '../../provider/store/season/actions';
import { Season } from '../../provider/store/types';

interface IUseListeners {
  currentSeason: Season
  seasonDispatch: Dispatch<SeasonActions>
}

export function useConnectFourListeners({ currentSeason, seasonDispatch }: IUseListeners) {
  /**
   * @event subscribes to the create game event and adds to game id array
   */
  useEffect(() => {
    const { connectFourContract } = currentSeason
    if (!connectFourContract) {
      return;
    }
    const createGameListener: TypedListener<GameCreatedEvent> = (gameId) => {
      seasonDispatch({
        type: SeasonAction.UPDATE_GAME_IDS,
        payload: BigNumber.from(gameId)
      })
    }
    connectFourContract.on(connectFourContract.filters.GameCreated(), createGameListener)
    return () => {
      connectFourContract.off(connectFourContract.filters.GameCreated(), createGameListener)
    }
  }, [seasonDispatch, currentSeason])

  /**
   * @event subscribes to the current games turn event event and adds to game id array
   */
  useEffect(() => {
    const { connectFourContract, currentGame } = currentSeason
    const turnTakenListener: TypedListener<TurnTakenEvent> = (gameId, teamAddress, column) => {
      seasonDispatch({
        type: SeasonAction.UPDATE_TURN,
        payload: { gameId: gameId.toNumber(), teamAddress, column }
      })
    }
    if (!connectFourContract) {
      return;
    }
    if(!currentGame) {
      connectFourContract.off(connectFourContract.filters.TurnTaken(), turnTakenListener)
      return;
    }
    connectFourContract.on(connectFourContract.filters.TurnTaken(), turnTakenListener)
    return () => {
      connectFourContract.off(connectFourContract.filters.TurnTaken(), turnTakenListener)

    }
  }, [currentSeason, seasonDispatch])

  // @todo game finished listener
  useEffect(() => {
    const { connectFourContract, currentGame } = currentSeason
    const gameFinishedListener: TypedListener<GameFinishedEvent> = (gameId, winningAddress) => {
      seasonDispatch({
        type: SeasonAction.UPDATE_WINNER,
        payload: { gameId: gameId.toNumber(), winningAddress }
      })
    }
    if (!connectFourContract) {
      return;
    }
    if(!currentGame) {
      connectFourContract.off(connectFourContract.filters.GameFinished(), gameFinishedListener)
      return;
    }
    connectFourContract.on(connectFourContract.filters.GameFinished(), gameFinishedListener)
    return () => {
      connectFourContract.off(connectFourContract.filters.GameFinished(), gameFinishedListener)

    }
  }, [currentSeason, seasonDispatch])
  return;
}