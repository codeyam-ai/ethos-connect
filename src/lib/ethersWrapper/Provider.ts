import { ethers } from 'ethers'

export interface EthosProvider extends ethers.providers.BaseProvider {
  getSigner: () => any
}

export class Provider {
  constructor(base: any, signer: any) {
    return new Proxy<ethers.providers.JsonRpcProvider>(base, {
      get: (_target: any, prop: any, receiver: any) => {
        if (prop === 'getSigner') {
          return () => signer
        }
        return Reflect.get(base, prop, receiver)
      },
    }) as EthosProvider
  }

  getSigner() {}
}
