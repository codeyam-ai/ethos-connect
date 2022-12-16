import BigNumber from "bignumber.js"

export interface WalletContents {
    suiBalance: BigNumber,
    tokens: {[key: string]: any},
    nfts: any[]
    objects: any[]
}