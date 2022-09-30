import { JsonRpcProvider } from '@mysten/sui.js'
import activeUser from './activeUser'
import { suiFullNode } from './constants'
import getConfiguration from './getConfiguration'
import networkToChain from './networkToChain'

const getProvider = async (network?: string | number): Promise<any> => {

  const { network: defaultNetwork } = getConfiguration()

  const rpcProvider = new JsonRpcProvider(suiFullNode);

  const user: any = await activeUser()

  const signer = Object()
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
