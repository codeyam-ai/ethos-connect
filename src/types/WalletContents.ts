import { CoinBalance } from "@mysten/sui.js"
import BigNumber from "bignumber.js"

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
    imageUri?: string,
    link?: string,
    creator?: string,
    projectUrl?: string,
    display?: Record<string, string>,
    extraFields?: Record<string, string>,
    collection?: SuiNFTCollection,
    links?: Record<string, string>
}

export interface Coin {
    type: string,
    objectId: string,
    balance: BigNumber,
    digest: string,
    version: number,
    display?: string | Record<string, string>
}

export interface Token {
    balance: BigNumber,
    coins: Coin[]
}

export interface WalletContents {
    suiBalance: BigNumber,
    balances: {[key: string]: CoinBalance},
    tokens: {[key: string]: Token},
    nfts: SuiNFT[]
    objects: any[],
    hasNextPage?: boolean,
    nextCursor?: string | {
        objectId: string;
        atCheckpoint?: number | undefined;
    }
}