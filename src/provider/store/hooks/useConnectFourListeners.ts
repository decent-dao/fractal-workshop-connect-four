import { Dispatch, useEffect } from 'react';
import { GameCreatedEvent } from 'b3-curious-contracts/typechain/BattleshipFactory';
import { TypedListener } from 'b3-curious-contracts/typechain/common';
import { BigNumber } from 'ethers';
import { SeasonActions, SeasonAction } from '../season/actions';
import { Season } from '../types';

interface IUseListeners {
  currentSeason: Season
  seasonDispatch: Dispatch<SeasonActions>
}

export function useConnectFourListeners({ currentSeason, seasonDispatch }: IUseListeners) {
  /**
   * @event subscribes to the create game event and adds to game id array
   */
  useEffect(() => {
    const connectFourContract = currentSeason.connectFourContract
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
  }, [seasonDispatch, currentSeason.connectFourContract])

  /**
   * @event subscribes to the current games turn event event and adds to game id array
   */
  // useEffect(() => {
  //   const connectFourContract = currentSeason.connectFourContract
  //   if (!connectFourContract) {
  //     return;
  //   }
  //   const turnTakenListener: TypedListener<TurnTakenEvent> = (gameId, teamAddress, column) => {
  //     gameDispatch({
  //       type: GameAction.UPDATE_TURN,
  //       payload: { gameId, teamAddress, column }
  //     })
  //   }
  //   connectFourContract.on(connectFourContract.filters.TurnTaken(), turnTakenListener)
  //   return () => {
  //     connectFourContract.off(connectFourContract.filters.TurnTaken(), turnTakenListener)

  //   }
  // }, [currentSeason.connectFourContract, gameDispatch])
  // // @todo game finished listener
  // useEffect(() => {
  //   const connectFourContract = currentSeason.connectFourContract
  //   if (!connectFourContract) {
  //     return;
  //   }
  //   connectFourContract.on(connectFourContract.filters.GameFinished(), () => { })
  //   return () => {
  //     connectFourContract.off(connectFourContract.filters.GameFinished(), () => { })

  //   }
  // }, [currentSeason])
  return;
}