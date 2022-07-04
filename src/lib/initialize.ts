import store from 'store2'
import { EthosConfiguration } from '../types/EthosConfiguration'
// import getIframe from './getIframe'

const initialize = (ethosConfiguration: EthosConfiguration): void => {
  const ethosStore = store.namespace('ethos')
  ethosStore('configuration', ethosConfiguration)
  // getIframe()
}

export default initialize
