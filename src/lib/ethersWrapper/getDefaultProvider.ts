import { Networkish } from '@ethersproject/networks'
import { ethers } from 'ethers'
import getConfiguration from '../getConfiguration'
import getSigner from '../getSigner'

const getDefaultProvider = (network?: Networkish) => {
  const { walletAppUrl, network: defaultNetwork } = getConfiguration()
  const rpcProvider = new ethers.providers.JsonRpcProvider(
    walletAppUrl + '/api/rpc',
    defaultNetwork
  )

  return new Proxy(rpcProvider, {
    get: (target: any, prop: any, receiver: any) => {
      switch (prop) {
        case 'getNetwork':
          return () => network
        case 'getSigner':
          return async () => {
            const signer = await getSigner()
            return signer
          }
        default:
          return Reflect.get(target, prop, receiver)
      }
    },
  })
}

export default getDefaultProvider
