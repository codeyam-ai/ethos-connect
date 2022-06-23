import getConfiguration from './getConfiguration'
import getIframe from './getIframe'

const hideWallet = () => {
  const { appId } = getConfiguration();
  getIframe({ appId })
}

export default hideWallet
