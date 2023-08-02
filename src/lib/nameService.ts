import { SuiClient } from '@mysten/sui.js/client'
import { DEFAULT_NETWORK } from './constants'

export const getSuiName = async (address: string, network?: string) => {
  const client = new SuiClient({ url: network ?? DEFAULT_NETWORK })
  return client.resolveNameServiceNames({ address })
}

export const getSuiAddress = async (name: string, network?: string) => {
  const client = new SuiClient({ url: network ?? DEFAULT_NETWORK })
  return client.resolveNameServiceAddress({ name })
}
