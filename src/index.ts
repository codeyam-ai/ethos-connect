import EthosWrapper from './components/EthosWrapper'

import SignInButton from './components/styled/SignInButton'
import { showSignInModal, hideSignInModal } from './components/styled/SignInModal';

import login from './lib/login'
import logout from './lib/logout'
import sign from './lib/sign'
import transact from './lib/transact'
import preapprove from './lib/preapprove'
import getWalletContents from './lib/getWalletContents'

import showWallet from './lib/showWallet'
import hideWallet from './lib/hideWallet'

import dripSui from './lib/dripSui'

import useProviderAndSigner from './hooks/useProviderAndSigner'
import useContents from './hooks/useContents'

const ethos = {
  login,
  logout,
  sign,
  transact,
  preapprove,
  getWalletContents,
  showWallet,
  hideWallet,
  dripSui,
  useProviderAndSigner,
  useContents,
  showSignInModal,
  hideSignInModal
}

// console.log('LOCAL 🥳🔮👹');

export { EthosWrapper, SignInButton, ethos }
