import Button from './components/headless/Button.js';

import SignInButton from './components/tailwind/SignInButton.js';
import SignInModal from './components/tailwind/SignInModal.js';

import login from './lib/login';
import logout from './lib/logout.js';
import transact from './lib/transact.js';
import walletContents from './lib/walletContents';
import activeUser from './lib/activeUser.js';
import tokenTransfers from './lib/tokenTransfers';
import query from './lib/query';
import getBalanceInEther from './lib/getBalanceInEther';
import showWallet from './lib/showWallet.js';
import hideWallet from './lib/hideWallet.js';

const headless = { 
  Button
}

const tailwind = {
  SignInButton,
  SignInModal
}

const lib = {
  login,
  logout,
  transact,
  walletContents, 
  activeUser,
  tokenTransfers,
  query,
  getBalanceInEther,
  showWallet,
  hideWallet
}

export {
  headless,
  tailwind,
  lib
}