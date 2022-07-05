import EthosWrapper from './components/EthosWrapper'

import Button from './components/headless/Button'

import SignInButton from './components/styled/SignInButton'
import SignInModal from './components/styled/SignInModal'

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
import getProvider from './lib/getProvider'

import * as ethers from './lib/ethersWrapper/ethersWrapper'

const headless = {
  Button,
}

const styled = {
  SignInButton,
  SignInModal,
}

const components = { EthosWrapper, headless, styled }

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
  getProvider,
}

export { components, lib, ethers }
