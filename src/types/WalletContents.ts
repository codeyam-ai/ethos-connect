export interface WalletContentContents {
    contents: WalletContents,
    objectInfos: any[]
}

export interface WalletContents {
    suiBalance: number,
    tokens: {[key: string]: any},
    nfts: any[]
}