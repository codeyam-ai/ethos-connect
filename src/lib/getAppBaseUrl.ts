import store from 'store2'
import { appBaseUrl } from './constants'

const getAppBaseUrl = (): string => {
  const ethosStore = store.namespace('ethos')
  const walletAppUrl = ethosStore('walletAppUrl')
  return walletAppUrl || appBaseUrl
}

export default getAppBaseUrl
