import { Chain } from '../enums/Chain'

const networkToChain = (network: string|number): Chain => {
  if (network === 'sui') return Chain.Sui;
  return Chain.Eth
}

export default networkToChain;