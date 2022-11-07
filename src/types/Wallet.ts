import { SuiAddress } from "@mysten/sui.js";
import { WalletContents } from "./WalletContents";
import { Signer } from "./Signer";

export interface Wallet extends Signer {
    address: SuiAddress,
    contents: WalletContents
} 