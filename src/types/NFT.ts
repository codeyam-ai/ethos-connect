export type NFT = {
  name: string
  tokenId: number
  imageUri: string
  collection: {
    name: string
  }
  // can this be changed to camelCase? Check how api/nft/[address] works in the Wallet Explorer repo
  block_number_minted?: number
}
