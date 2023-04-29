import type { Preapproval } from './Preapproval'
import type { SignedTransaction, SuiAddress, SuiTransactionBlockResponse } from '@mysten/sui.js';
import type { 
  SuiSignMessageOutput,
  WalletAccount 
} from '@mysten/wallet-standard'
import { EthosSignMessageInput } from './EthosSignMessageInput';
import { EthosSignTransactionBlockInput } from './EthosSignTransactionBlockInput';
import { EthosSignAndExecuteTransactionBlockInput } from './EthosSignAndExecuteTransactionBlockInput';
import { EthosExecuteTransactionBlockInput } from './EthosExecuteTransactionBlockInput';

export enum SignerType {
  Extension = "extension",
  Hosted = "hosted"
}

export interface Signer {
  type: SignerType,
  name?: string,
  icon?: string,
  getAddress: () => Promise<SuiAddress | null>
  accounts: readonly WalletAccount[],
  currentAccount: WalletAccount | null,
  signAndExecuteTransactionBlock: (input: EthosSignAndExecuteTransactionBlockInput) => Promise<SuiTransactionBlockResponse>,
  executeTransactionBlock: (input: EthosExecuteTransactionBlockInput) => Promise<SuiTransactionBlockResponse>,
  signTransactionBlock: (input: EthosSignTransactionBlockInput) => Promise<SignedTransaction>,
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