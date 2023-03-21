import type { Preapproval } from './Preapproval'
import type { SuiTransactionResponse } from '@mysten/sui.js';
import type { 
  SuiSignMessageOutput,
  WalletAccount 
} from '@mysten/wallet-standard'
import { EthosSignMessageInput } from './EthosSignMessageInput';
import { EthosSignAndExecuteTransactionInput } from './EthosSignAndExecuteTransactionInput';

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
  signAndExecuteTransaction: (input: EthosSignAndExecuteTransactionInput) => Promise<SuiTransactionResponse>,
  requestPreapproval: (preApproval: Preapproval) => Promise<boolean>,
  signMessage: (input: EthosSignMessageInput) => Promise<SuiSignMessageOutput>,
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