import { Context, createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { WagmiConfig, useProvider } from "wagmi"
import { goerliConfig } from "./networks"

import { configureChains, createClient, createStorage, goerli } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"
import { BaseContracts, NetworkConfig } from "./types"
import { defaultNetworkState } from "./constants"
import { FractalRegistry__factory, GnosisSafe__factory } from "@fractal-framework/fractal-contracts"
import { ConnectFour__factory, ConnectFourFactory__factory } from "b3-curious-contracts/typechain"

export const chainsArr = [goerli]

export const { chains, provider } = configureChains(chainsArr, [
  infuraProvider({ priority: 0, apiKey: process.env.REACT_APP_INFURA_API_KEY! }),
  alchemyProvider({ priority: 1, apiKey: process.env.REACT_APP_ALCHEMY_API_KEY! }),
  publicProvider({ priority: 2 }),
])

export const wagmiClient = createClient({
  storage: createStorage({ storage: window.localStorage }),
  provider,
})

export const NetworkConfigContext = createContext({} as NetworkConfig)

export const useWeb3NetworkConfig = (): NetworkConfig =>
  useContext(NetworkConfigContext as Context<NetworkConfig>)

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
  const [baseContracts, setBaseContracts] = useState<BaseContracts>();


  useEffect(() => {
    const connectFourBase = ConnectFour__factory.connect(config.contractAddresses.connectFourAddress, provider);
    const connectFourFactoryBase = ConnectFourFactory__factory.connect(config.contractAddresses.connectFourAddress, provider);
    const fractalRegistryBase = FractalRegistry__factory.connect(config.contractAddresses.connectFourAddress, provider);
    const gnosisSafeBase = GnosisSafe__factory.connect(config.contractAddresses.connectFourAddress, provider);
    setBaseContracts({
      connectFourBase,
      connectFourFactoryBase,
      fractalRegistryBase,
      gnosisSafeBase
    })
  }, [])

  useEffect(() => {
    setConfig(getNetworkConfig(provider.network.chainId))
  }, [provider])

  const value = useMemo(() => ({
    baseContracts,
    ...config
  }), [baseContracts, config])

  return (
    <NetworkConfigContext.Provider value={value}>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
    </NetworkConfigContext.Provider>
  )
}
