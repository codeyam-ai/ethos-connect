import { WalletContents } from "./WalletContents";
import { Signer } from "./Signer";

export interface Wallet extends Signer {
    address: string,
    contents?: WalletContents
} 