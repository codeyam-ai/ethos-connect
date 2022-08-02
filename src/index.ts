import EthosWrapper from './components/EthosWrapper'

import SignInButton from './components/styled/SignInButton'

import initialize from './lib/initialize'
import login from './lib/login'
import logout from './lib/logout'
import transact from './lib/transact'

import getWalletBalance from './lib/getWalletBalance'
import getWalletNfts from './lib/getWalletNfts'
import getWalletContents from './lib/getWalletContents'

import activeUser from './lib/activeUser'
import tokenTransfers from './lib/tokenTransfers'
import query from './lib/query'

import showWallet from './lib/showWallet'
import hideWallet from './lib/hideWallet'
import getProvider from './lib/getProvider'

import dripSui from './lib/dripSui'

const ethos = {
  initialize,
  login,
  logout,
  transact,
  getWalletBalance,
  getWalletNfts,
  getWalletContents,
  activeUser,
  tokenTransfers,
  query,
  showWallet,
  hideWallet,
  getProvider,
  dripSui,
}

export { EthosWrapper, SignInButton, ethos }
