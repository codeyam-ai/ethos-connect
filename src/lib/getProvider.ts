import { Networkish } from '@ethersproject/networks'
import { ethers } from 'ethers'
import activeUser from './activeUser'
import getConfiguration from './getConfiguration'
import networkToChain from './networkToChain'

const getProvider = (network?: Networkish): ethers.providers.Web3Provider => {
  const { appId, walletAppUrl, network: defaultNetwork } = getConfiguration()
  const rpcProvider = new ethers.providers.JsonRpcProvider(
    walletAppUrl + '/api/rpc',
    defaultNetwork
  )

  const signer = rpcProvider.getSigner()
  const proxySigner = new Proxy(signer, {
    get: (target: any, prop: any, receiver: any) => {
      switch (prop) {
        case 'ethos':
          return true
        case 'getAddress':
          return async () => {
            const user: any = await activeUser(appId)
            const networkString = networkToChain((network || defaultNetwork).toString())
            return user.accounts.find((account: any) => account.chain === networkString)?.address
          }
        default:
          return Reflect.get(target, prop, receiver)
      }
    },
  })

  return new Proxy(rpcProvider, {
    get: (target: any, prop: any, receiver: any) => {
      switch (prop) {
        case 'getNetwork':
          return () => network
        case 'getSigner':
          return () => proxySigner
        default:
          return Reflect.get(target, prop, receiver)
      }
    },
  })
}

export default getProvider
