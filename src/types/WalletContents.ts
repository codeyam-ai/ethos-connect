import BigNumber from "bignumber.js"
import { SuiObject } from '@mysten/sui.js';

export interface SuiNFTCollection {
    name: string,
    type: string
}

export interface SuiNFT {
    chain: string,
    type: string,
    package: string,
    module: string
    address: string,
    objectId: string,
    name?: string,
    description?: string,
    imageUri?: string
    extraFields?: SuiObject,
    collection?: SuiNFTCollection,
    links?: Record<string, string>
}

export interface WalletContents {
    suiBalance: BigNumber,
    tokens: {[key: string]: any},
    nfts: any[]
    objects: any[]
}