import type { AddressInfo } from './hooks/utils/useAddressLookup';

export type Team = {
    color: string,
    addressInfo: AddressInfo
}

export type ConnectSquare = {
    location: string,
    // @note undefined = no piece
    // @note colors = space occupied
    team?: 1 | 2
    connected?: boolean
}