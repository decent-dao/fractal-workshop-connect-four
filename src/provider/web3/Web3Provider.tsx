import { Context, ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { WagmiConfig, configureChains, createClient, createStorage, goerli, useProvider } from 'wagmi'
import { goerliConfig } from './networks'

import { FractalRegistry__factory as fractalRegistryInterface, GnosisSafe__factory as gnosisSafeInterface } from '@fractal-framework/fractal-contracts'
import { ConnectFour__factory as connectFourInterface, ConnectFourFactory__factory as connectFourFactoryInterface } from 'b3-curious-contracts/typechain'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { defaultNetworkState } from './constants'
import { BaseContracts, NetworkConfig } from './types'

export const chainsArr = [goerli]

export const { chains, provider } = configureChains(chainsArr, [
  infuraProvider({ priority: 0, apiKey: import.meta.env.VITE_INFURA_ID }),
  alchemyProvider({ priority: 1, apiKey: import.meta.env.VITE_ALCHEMY_ID }),
  publicProvider({ priority: 2 }),
])

export const wagmiClient = createClient({
  storage: createStorage({ storage: window.localStorage }),
  provider,
})

export const NetworkConfigContext = createContext({} as NetworkConfig)

export const useWeb3NetworkConfig = (): NetworkConfig => useContext(NetworkConfigContext as Context<NetworkConfig>)

const getNetworkConfig = (chainId: number) => {
  switch (chainId) {
    case 5:
    case 31337:
      return goerliConfig
    case 1:
    default:
      return defaultNetworkState
  }
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const provider = useProvider()
  const [config, setConfig] = useState<NetworkConfig>(getNetworkConfig(5))
  const [baseContracts, setBaseContracts] = useState<BaseContracts>()

  useEffect(() => {
    const connectFourBase = connectFourInterface.connect(config.contractAddresses.connectFourAddress, provider)
    const connectFourFactoryBase = connectFourFactoryInterface.connect(config.contractAddresses.connectFourAddress, provider)
    const fractalRegistryBase = fractalRegistryInterface.connect(config.contractAddresses.connectFourAddress, provider)
    const gnosisSafeBase = gnosisSafeInterface.connect(config.contractAddresses.connectFourAddress, provider)
    setBaseContracts({
      connectFourBase,
      connectFourFactoryBase,
      fractalRegistryBase,
      gnosisSafeBase,
    })
  }, [config, provider])

  useEffect(() => {
    setConfig(getNetworkConfig(provider.network.chainId))
  }, [provider])

  const value = useMemo(
    () => ({
      baseContracts,
      ...config,
    }),
    [baseContracts, config],
  )

  return (
    <NetworkConfigContext.Provider value={value}>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
    </NetworkConfigContext.Provider>
  )
}
