export type NFT = {
  name: string
  tokenId: number
  imageUri: string
  previewUri?: string
  chain: string
  collection: {
    name: string
  }
  block_number_minted?: number
}
