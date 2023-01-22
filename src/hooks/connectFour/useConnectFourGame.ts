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
  const { currentSeason, dispatch } = useStore()
  const { lookupAddress } = useAddressLookup()
  const getGameData = useCallback(async (_gameId: number): Promise<GameBase | undefined> => {
    if (!currentSeason.connectFourContract) {
      return;
    }
    try {
      const { teamOne, teamTwo, ...rest } = await currentSeason.connectFourContract.getGame(_gameId);
      return {
        ...rest,
        gameId: _gameId,
        teamOne: await lookupAddress(teamOne),
        teamTwo: await lookupAddress(teamTwo),
      };
    } catch (e) {
      console.error('🚀 There was a problem retreiving game', e)
    }
  }, [currentSeason, lookupAddress])

  const getBoardData = useCallback(async (_gameId: number) => {
    if (!currentSeason.connectFourContract) {
      return;
    }
    try {

      const board = await currentSeason.connectFourContract.getGameBoard(_gameId);
      const typeedBoard: (number | string)[][] = [...board]
      typeedBoard.push(new Array(6).fill('x'))
      const connectBoard: ConnectSquare[][] = typeedBoard.reverse().map((col, column) => col.map((square, row) => {
        if (square === 'x') {
          return {
            location: `${square}:${row}`
          }
        }
        if (square === 1 || square === 2) {
          return {
            location: `${6 - column}:${row}`,
            team: square
          }
        }
        return {
          location: `${6 - column}:${row}`
        }
      }))
      return connectBoard
    } catch (e) {
      console.error('🚀 There was a problem retreiving game', e)
    }
  }, [currentSeason])

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
    if (currentSeason.currentGame?.gameId !== Number(gameId) && gameId) {
      retrieveData()
    }
  }, [gameId, currentSeason.currentGame, getGameData, getBoardData, dispatch])

  return { getGameData, getBoardData };
}