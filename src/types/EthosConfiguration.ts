import { Chain } from 'enums/Chain'
export interface EthosConfiguration {
  appId: string
  walletAppUrl: string
  chain: Chain
  network: string | number
}

export interface SuiConfiguration extends EthosConfiguration {}
export interface EthereumConfiguration extends EthosConfiguration {
  alchemyId: string
}
