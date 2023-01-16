import { AddressInfo } from './../../hooks/utils/useAddressLookup';
import { ConnectFour } from 'b3-curious-contracts/typechain';

export interface Store {
  currentGame: Game;
  currentSeason: Season;
}

export interface Season {
  currentSeasonAddress: string;
  connectFourContract: ConnectFour | null;
  gameIds: number[];
}

export interface Game {
  gameId: number | null;
  teamOne: AddressInfo | null;
  teamTwo: AddressInfo | null;
  turn: number;
  winner: string;
  states: GameStates
}

export type GameStates = {
  isGameLoading: boolean,
  isMoveLoading: boolean,
  isGameOver: boolean,
}