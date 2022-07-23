import { ethers } from 'ethers'

export interface EthosProvider extends ethers.providers.BaseProvider {
  getSigner: () => any
}
