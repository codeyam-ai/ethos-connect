import { Chain } from '../enums/Chain'

const networkToChain = (network: string | number): Chain => {
  // For future use with test networks
  if (network === 'sui') return Chain.Sui
  return Chain.Sui
}

export default networkToChain
