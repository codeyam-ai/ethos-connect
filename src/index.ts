import EthosConnectProvider from './components/EthosConnectProvider'
import SignInButton from './components/styled/SignInButton'

import { showSignInModal, hideSignInModal } from './components/styled/SignInModal';

import AddressWidget from './components/styled/AddressWidget'
import HoverColorButton from './components/headless/HoverColorButton'

import login from './lib/login'
import logout from './lib/logout'
import sign from './lib/sign'
import transact from './lib/transact'
import preapprove from './lib/preapprove'
import getWalletContents from './lib/getWalletContents'

import showWallet from './lib/showWallet'
import hideWallet from './lib/hideWallet'

import dripSui from './lib/dripSui'
import lookup from './lib/lookup'
import formatBalance from './lib/formatBalance';
import truncateMiddle from './lib/truncateMiddle';

import useProviderAndSigner from './hooks/useProviderAndSigner'
import useAddress from './hooks/useAddress'
import useContents from './hooks/useContents'
import useWallet from './hooks/useWallet'

// Enums (must be exported as objects, NOT types)
import { EthosConnectStatus } from './types/EthosConnectStatus';

// Types, interfaces, and enums
import { Wallet } from './types/Wallet';
import { WalletContents } from './types/WalletContents';

const components = {
    styled: {   
        Address: AddressWidget
    },
    headless: {
        HoverColorButton
    }   
}    


const ethos = {
  login,
  logout,

  sign,
  transact,
  preapprove,

  showWallet,
  hideWallet,
  
  showSignInModal,
  hideSignInModal,
  
  useProviderAndSigner,
  useAddress,
  useContents,
  useWallet,
  getWalletContents,

  dripSui,
  lookup,
  formatBalance,
  truncateMiddle,

  components
}

export {
  EthosConnectProvider,
  SignInButton,
  ethos,
  EthosConnectStatus
}

export type {
  Wallet,
  WalletContents
}
