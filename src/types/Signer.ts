import type { Preapproval } from './Preapproval'
import type { 
  ExecuteTransactionRequestType,
  SuiTransactionResponse,
  Transaction
} from '@mysten/sui.js';
import type { WalletAccount, IdentifierString } from '@mysten/wallet-standard'

export enum SignerType {
  Extension = "extension",
  Hosted = "hosted"
}

export interface SignAndExecuteTransactionOptions {
  requestType?: ExecuteTransactionRequestType
}

export interface SignAndExecuteTransactionInput {
  transaction: Transaction,
  account: WalletAccount,
  chain: IdentifierString
}


export interface Signer {
  type: SignerType,
  name?: string,
  icon?: string,
  accounts: readonly WalletAccount[],
  currentAccount: WalletAccount | null,
  signAndExecuteTransaction: (input: SignAndExecuteTransactionInput, options?: SignAndExecuteTransactionOptions) => Promise<SuiTransactionResponse>,
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