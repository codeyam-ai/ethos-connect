import type { Preapproval } from './Preapproval'
import type { 
  SignableTransaction,
  SuiTransactionResponse
} from '@mysten/sui.js';

export enum SignerType {
  EXTENSION = "extension",
  ETHOS_HOSTED = "ethos_hosted"
}

export type Signer = {
  type: SignerType,
  getAccounts: () => Promise<string[]>,
  getAddress: () => Promise<string>,
  signAndExecuteTransaction: (transaction: SignableTransaction) => Promise<SuiTransactionResponse>,
  requestPreapproval: (preApproval: Preapproval) => Promise<boolean>,
  sign: (message: any) => Promise<boolean>,
  disconnect: (wallet?: boolean) => void
}