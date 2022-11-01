import store from 'store2'
import { EthosConfiguration } from '../types/EthosConfiguration'

const getConfiguration = (): EthosConfiguration => {
  const ethosStore = store.namespace('ethos')
  const configuration = ethosStore('configuration')
  return configuration || {}
}

export default getConfiguration
