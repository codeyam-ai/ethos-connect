import { Chain } from '../enums/Chain'
export interface EthosConfiguration {
  apiKey?: string
  walletAppUrl?: string
  chain?: Chain
  network?: string | number
  hideEmailSignIn?: boolean
  hideWalletSignIn?: boolean
}
