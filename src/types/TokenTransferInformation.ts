import { ethers } from 'ethers'

export type TokenTransferInformation = {
  orderedTransfers: ethers.Event[]
  currentTokenIds: string[]
}
