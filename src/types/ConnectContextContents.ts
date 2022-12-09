import { WalletContextContents } from "./WalletContextContents";

export interface ConnectContextContents {
    wallet?: WalletContextContents,
    modal?: any,
    providerAndSigner?: any
    setContext: any
}