import { ConnectSquare } from '../../types';
import { useStore } from '../../provider/store/StoreProvider';
import { GameBase } from '../../provider/store/types';
import { useCallback, useEffect } from 'react';
import { useAddressLookup } from '../utils/useAddressLookup';
import { SeasonAction } from '../../provider/store/season/actions';

interface IUseConnectFourGame {
  gameId?: string;
}

export function useConnectFourGame({ gameId }: IUseConnectFourGame) {
  const { currentSeason: { connectFourContract, currentGame }, dispatch } = useStore()
  const { lookupAddress } = useAddressLookup()
  const getGameData = useCallback(async (_gameId: number): Promise<GameBase | undefined> => {
    if (!connectFourContract) {
      return;
    }
    try {
      const { teamOne, teamTwo, ...rest } = await connectFourContract.getGame(_gameId);
      const turnEvents = (await connectFourContract.queryFilter(connectFourContract.filters.TurnTaken(_gameId))).reverse();
      return {
        ...rest,
        gameId: _gameId,
        teamOne: await lookupAddress(teamOne),
        teamTwo: await lookupAddress(teamTwo),
        lastTurnData: turnEvents.length ? {
          lastRow: 0,
          teamNum: turnEvents[0].args[1] === teamOne ? 1 : 2,
          lastColumn: turnEvents[0].args[2],
        } : undefined
      };
    } catch (e) {
      console.error('🚀 There was a problem retreiving game', e)
    }
  }, [connectFourContract, lookupAddress])

  const getBoardData = useCallback(async (_gameId: number) => {
    if (!connectFourContract) {
      return;
    }
    try {

      const board = await connectFourContract.getGameBoard(_gameId);
      const connectBoard: ConnectSquare[][] = [...board].map((col, row) => col.map((square, column) => {
        if (square === 1 || square === 2) {
          return {
            location: `${row}:${column}`,
            team: square
          }
        }
        return {
          location: `${row}:${column}`
        }
      }))
      return connectBoard.reverse()
    } catch (e) {
      console.error('🚀 There was a problem retreiving game', e)
    }
  }, [connectFourContract])

  useEffect(() => {
    const retrieveData = async () => {
      // get game data
      const game = await getGameData(Number(gameId))
      // get board data
      const board = await getBoardData(Number(gameId))
      // dispatch game to state
      if (!!game && !!board) {
        dispatch({
          type: SeasonAction.SET_GAME,
          payload: { ...game, board }
        })
      }
    }
    if (currentGame?.gameId !== Number(gameId) && gameId) {
      retrieveData()
    }
  }, [gameId, currentGame, getGameData, getBoardData, dispatch])

  return { getGameData, getBoardData };
}