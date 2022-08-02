import { Networkish } from '@ethersproject/networks'
import { ethers } from 'ethers'
import activeUser from './activeUser'
import getConfiguration from './getConfiguration'
// import log from './log'
import networkToChain from './networkToChain'

const getProvider = async (network?: Networkish): Promise<ethers.providers.Web3Provider> => {
  // const provider = new ethers.providers.Web3Provider((window as any).ethereum)
  // const addresses = (await provider?.listAccounts()) || []
  // if (addresses.length > 0) {
  //   return provider
  // }

  const { walletAppUrl, network: defaultNetwork } = getConfiguration()

  const rpcProvider =
    defaultNetwork === 'sui'
      ? Object()
      : new ethers.providers.JsonRpcProvider(walletAppUrl + '/api/rpc', defaultNetwork)

  const user: any = await activeUser()

  const signer = defaultNetwork === 'sui' ? Object() : rpcProvider.getSigner()
  const proxySigner = new Proxy(signer, {
    get: (target: any, prop: any, receiver: any) => {
      switch (prop) {
        case 'ethos':
          return true
        case 'email':
          return user.email
        case 'getAddress':
          return async () => {
            const networkString = networkToChain((network || defaultNetwork || 'sui').toString())
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
        case 'ethos':
          return true
        case 'getNetwork':
          return () => network
        case 'getSigner':
          return () => (user ? proxySigner : undefined)
        default:
          return Reflect.get(target, prop, receiver)
      }
    },
  })
}

export default getProvider
