import type { Preapproval } from './Preapproval'
import type { SuiTransactionResponse } from '@mysten/sui.js';
import type { WalletAccount, SuiSignTransactionInput, SuiSignAndExecuteTransactionOptions } from '@mysten/wallet-standard'

export enum SignerType {
  Extension = "extension",
  Hosted = "hosted"
}

export interface Signer {
  type: SignerType,
  name?: string,
  icon?: string,
  accounts: readonly WalletAccount[],
  currentAccount: WalletAccount | null,
  signAndExecuteTransaction: (input: SuiSignTransactionInput, options?: SuiSignAndExecuteTransactionOptions) => Promise<SuiTransactionResponse>,
  requestPreapproval: (preApproval: Preapproval) => Promise<boolean>,
  signMessage: (message: any) => Promise<any>,
  disconnect: () => void
}

export interface ExtensionSigner extends Signer {
    type: SignerType.Extension,   
}

export interface HostedSigner extends Signer {
    type: SignerType.Hosted,
    email?: string,
    logout: () => void
}