import { Chain } from '../enums/Chain'
import { InvalidPackages } from '../types/InvalidPackages';

export interface EthosConfiguration {
  apiKey?: string
  walletAppUrl?: string
  chain?: Chain
  network?: string
  hideEmailSignIn?: boolean
  hideWalletSignIn?: boolean
  preferredWallets?: string[]
  redirectTo?: string;
  disableAutoConnect?: boolean;
  pollingInterval?: number;
  invalidPackages?: InvalidPackages;
}
