import type { Preapproval } from './Preapproval'
import type { 
  ExecuteTransactionRequestType,
  SignableTransaction,
  SuiTransactionResponse
} from '@mysten/sui.js';

export enum SignerType {
  Extension = "extension",
  Hosted = "hosted"
}

export interface SignAndExecuteTransactionOptions {
  requestType?: ExecuteTransactionRequestType
}

export interface Signer {
  type: SignerType,
  name?: string,
  icon?: string,
  getAccounts: () => Promise<string[]>,
  getAddress: () => Promise<string>,
  signAndExecuteTransaction: (transaction: SignableTransaction, options?: SignAndExecuteTransactionOptions) => Promise<SuiTransactionResponse>,
  requestPreapproval: (preApproval: Preapproval) => Promise<boolean>,
  sign: (message: any) => Promise<any>,
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