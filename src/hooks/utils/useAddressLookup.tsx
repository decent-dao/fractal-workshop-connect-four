import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { useProvider } from 'wagmi'
import { addressSubString } from '../../utils/string'
import { isAddress } from 'ethers/lib/utils.js'
import { useWeb3NetworkConfig } from '../../provider/web3/Web3Provider'
export type AddressInfo = {
  full: string | null
  truncated: string | null
  ensName: string | null
  registryDAOName: string | null
  isSafe: boolean
  displayName: string | null
  addressURL: string | null
}

// @todo make this for network friendly
export const ADDRESS_URLS: {[key: string]: (address: string) => string} = {
  etherscan: (address: string) => `https://goerli.etherscan.io/address/${address}`,
  gnosis: (address: string) => `https://app.safe.global/gor:${address}`,
  fractal: (address: string) => `https://app.dev.fractalframework.xyz/#/daos/${address}`
}

export const getAddressURL = (address: string, typeIndex: string) => {
  return ADDRESS_URLS[typeIndex](address);
}

export const intialAddressState = {
  full: null,
  truncated: null,
  ensName: null,
  registryDAOName: null,
  isSafe: false,
  displayName: null,
  addressURL: null
}

enum AddressLookupAction {
  SET_ADDRESS,
  RESET,
}

type AddressLoopupActions =
  | { type: AddressLookupAction.SET_ADDRESS; payload: AddressInfo }
  | { type: AddressLookupAction.RESET }

const reducer = (state: AddressInfo, action: AddressLoopupActions) => {
  switch (action.type) {
    case AddressLookupAction.SET_ADDRESS: {
      return { ...action.payload }
    }
    case AddressLookupAction.RESET: {
      return intialAddressState
    }
    default:
      return state
  }
}

export const useAddressLookup = (address?: string) => {
  const [addressInfo, addrDispatch] = useReducer(reducer, intialAddressState)
  const provider = useProvider()
  const { baseContracts } = useWeb3NetworkConfig()

  const displayName = useMemo(() => {
    const { truncated, ensName, registryDAOName } = addressInfo
    return ensName || registryDAOName || truncated || ''
  }, [addressInfo])

  const lookupAddress = useCallback(
    async (_address?: string) => {
      if (!_address || !isAddress(_address) || !baseContracts) {
        addrDispatch({ type: AddressLookupAction.RESET })
        return intialAddressState
      }

      const registryContract = baseContracts.fractalRegistryBase
      const [ensName, registryDAONameEvent, contractGetCall] = await Promise.all([
        provider.lookupAddress(_address).catch(() => null),
        registryContract.queryFilter(registryContract.filters.FractalNameUpdated(_address)),
        baseContracts.gnosisSafeBase
          .attach(_address)
          .getChainId()
          .catch(() => null), // fails if not a Safe
      ])

      const registryDAOName = registryDAONameEvent[0] ? registryDAONameEvent[0].args[1] : null
      const isSafe = !!contractGetCall
      const truncated = addressSubString(_address)
      const displayName = ensName || registryDAOName || truncated

      const addressType = registryDAOName ? 'fractal' : isSafe ? 'gnosis' : 'etherscan'
      const addressInfo = {
        full: _address,
        ensName,
        registryDAOName,
        truncated,
        isSafe,
        displayName,
        addressURL: getAddressURL(_address, addressType)
      }
      return addressInfo
    },
    [provider, baseContracts],
  )

  const storeAddressInfo = useCallback(
    async (_address?: string) => {
      addrDispatch({
        type: AddressLookupAction.SET_ADDRESS,
        payload: await lookupAddress(_address),
      })
    },
    [lookupAddress],
  )

  useEffect(() => {
    if (address) {
      storeAddressInfo(address)
    }
  }, [storeAddressInfo, address])

  return { addressInfo, displayName, lookupAddress }
}
