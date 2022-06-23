import store from 'store2'
import { EthosConfiguration } from '../types/EthosConfiguration'

const initialize = (ethosConfiguration: EthosConfiguration): void => {
  const ethosStore = store.namespace('ethos')
  ethosStore('configuration', ethosConfiguration)
}

export default initialize
