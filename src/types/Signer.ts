import type { Preapproval } from './Preapproval'
import type { 
  SignableTransaction,
  SuiTransactionResponse
} from '@mysten/sui.js';

export enum SignerType {
  EXTENSION = "extension",
  HOSTED = "hosted"
}

export interface Signer {
  type: SignerType,
  getAccounts: () => Promise<string[]>,
  getAddress: () => Promise<string>,
  signAndExecuteTransaction: (transaction: SignableTransaction) => Promise<SuiTransactionResponse>,
  requestPreapproval: (preApproval: Preapproval) => Promise<boolean>,
  sign: (message: any) => Promise<boolean>,
  disconnect: () => void
}

export interface ExtensionSigner extends Signer {
    type: SignerType.EXTENSION,   
}

export interface HostedSigner extends Signer {
    type: SignerType.HOSTED,
    email?: string,
    logout: () => void
}