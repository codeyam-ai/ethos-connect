import store from 'store2'
import { EthosConfiguration } from '../types/EthosConfiguration'
import getIframe from './getIframe'

const initialize = (ethosConfiguration: EthosConfiguration): void => {
  const ethosStore = store.namespace('ethos')
  ethosConfiguration.iframeOrigin =
    typeof window !== undefined && !window.location.href.startsWith('file')
      ? window.location.href
      : '*'
  ethosStore('configuration', ethosConfiguration)

  getIframe()
}

export default initialize
