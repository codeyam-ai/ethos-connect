import EthosConnectProvider from './components/EthosConnectProvider'
import SignInButton from './components/styled/SignInButton'

import { showSignInModal, hideSignInModal } from './components/styled/SignInModal';

import AddressWidget from './components/styled/AddressWidget'
import MenuButton from './components/styled/MenuButton'
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
import { formatBalance } from './lib/bigNumber';
import truncateMiddle from './lib/truncateMiddle';

import useProviderAndSigner from './hooks/useProviderAndSigner'
import useAddress from './hooks/useAddress'
import useContents from './hooks/useContents'
import useWallet from './hooks/useWallet'

// Enums (must be exported as objects, NOT types)
import { EthosConnectStatus } from './enums/EthosConnectStatus';
import { AddressWidgetButtons } from './enums/AddressWidgetButtons'

// Types, interfaces, and enums
import { Wallet } from './types/Wallet';
import { WalletContents } from './types/WalletContents';
import { ProviderAndSigner } from './types/ProviderAndSigner';
import { Signer } from './types/Signer';

import useContext from './hooks/useContext';
import DetachedEthosConnectProvider from './components/DetachedEthosConnectProvider';

const components = {
  AddressWidget,
  MenuButton,
  headless: {
    HoverColorButton
  }
}

const enums = {
  AddressWidgetButtons
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
  useContext,
  getWalletContents,

  dripSui,
  lookup,
  formatBalance,
  truncateMiddle,

  components,

  enums
}

export {
  EthosConnectProvider,
  DetachedEthosConnectProvider,
  SignInButton,
  ethos,
  EthosConnectStatus
}

export type {
  Wallet,
  WalletContents,
  ProviderAndSigner,
  Signer
}
