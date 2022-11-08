import type { Preapproval } from './Preapproval'
import type { 
  SignableTransaction,
  SuiTransactionResponse
} from '@mysten/sui.js';

export enum SignerType {
  Extension = "extension",
  Hosted = "hosted"
}

export interface Signer {
  type: SignerType,
  getAccounts: () => Promise<string[]>,
  getAddress: () => Promise<string>,
  signAndExecuteTransaction: (transaction: SignableTransaction) => Promise<SuiTransactionResponse>,
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