import { ContractAddresses, NetworkConfig } from './../types';
import FractalRegistry from '@fractal-framework/fractal-contracts/deployments/goerli/FractalRegistry.json'
import fractalDeployments from '@fractal-framework/fractal-demos-contracts/minified/deployments.json'
const { ConnectFour } = fractalDeployments.contracts

export const goerliAddresses: ContractAddresses = {
  gnosisSafeAddress: '0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552',
  connectFourAddress: ConnectFour.address,
  fractalRegistryAddress: FractalRegistry.address,
}

export const goerliConfig: NetworkConfig = {
  chainId: 5,
  safeBaseURL: '',
  contractAddresses: goerliAddresses
}
