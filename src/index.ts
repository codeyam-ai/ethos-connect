import Button from './components/headless/Button'

import SignInButton from './components/tailwind/SignInButton'
import SignInModal from './components/tailwind/SignInModal'

import initialize from './lib/initialize'
import login from './lib/login'
import logout from './lib/logout'
import transact from './lib/transact'
import walletContents from './lib/walletContents'
import activeUser from './lib/activeUser'
import tokenTransfers from './lib/tokenTransfers'
import query from './lib/query'
import ethBalance from './lib/ethBalance'
import showWallet from './lib/showWallet'
import hideWallet from './lib/hideWallet'
import getSigner from './lib/getSigner';

const headless = {
  Button,
}

const tailwind = {
  SignInButton,
  SignInModal,
}

const lib = {
  initialize,
  login,
  logout,
  transact,
  walletContents,
  activeUser,
  tokenTransfers,
  query,
  ethBalance,
  showWallet,
  hideWallet,
  getSigner
}
console.log('local 💩');

export { headless, tailwind, lib }
