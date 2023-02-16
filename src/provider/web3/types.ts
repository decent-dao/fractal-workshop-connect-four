import { FractalRegistry, GnosisSafe } from '@fractal-framework/fractal-contracts';
import { ConnectFour } from '@fractal-framework/fractal-demos-contracts/typechain';

export type ContractAddresses = {
  connectFourAddress: string,
  fractalRegistryAddress: string;
  gnosisSafeAddress: string,
}

export type NetworkConfig = {
  safeBaseURL: string;
  chainId: number;
  contractAddresses: ContractAddresses
  baseContracts?: BaseContracts
}

export type BaseContracts = {
  connectFourBase: ConnectFour,
  fractalRegistryBase: FractalRegistry;
  gnosisSafeBase: GnosisSafe;
}