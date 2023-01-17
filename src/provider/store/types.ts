import { AddressInfo } from './../../hooks/utils/useAddressLookup';
import { ConnectFour } from 'b3-curious-contracts/typechain';

export interface Store {
  currentSeason: Season;
}

export interface Season {
  currentSeasonAddress: string;
  connectFourContract: ConnectFour | null;
  gameIds: number[];
  currentGame: Game | null;
}

export interface Game {
  gameId: number;
  teamOne: AddressInfo;
  teamTwo: AddressInfo;
  turn: number;
  winner: string;
  board: number[][];
  states: GameStates
}

export type GameStates = {
  isGameLoading: boolean,
  isMoveLoading: boolean,
  isGameOver: boolean,
}