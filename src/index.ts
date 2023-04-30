import { TransactionBlock, verifyMessage, IntentScope } from '@mysten/sui.js';
import { WalletAccount } from '@mysten/wallet-standard';

import EthosConnectProvider from './components/EthosConnectProvider';
import SignInButton from './components/styled/SignInButton';

import { hideSignInModal, showSignInModal } from './components/styled/SignInModal';

import HoverColorButton from './components/headless/HoverColorButton';
import AddressWidget from './components/styled/AddressWidget';
import MenuButton from './components/styled/MenuButton';

import getWalletContents, { ipfsConversion } from './lib/getWalletContents';
import login from './lib/login';
import logout from './lib/logout';
import preapprove from './lib/preapprove';
import sign from './lib/sign';
import transact from './lib/transact';
import signTransactionBlock from './lib/signTransactionBlock';
import executeTransactionBlock from './lib/executeTransactionBlock';

import hideWallet from './lib/hideWallet';
import showWallet from './lib/showWallet';

import { formatBalance } from './lib/bigNumber';
import dripSui from './lib/dripSui';
import { getSuiAddress, getSuiName } from './lib/nameService';
import truncateMiddle from './lib/truncateMiddle';

import useAddress from './hooks/useAddress';
import useContents from './hooks/useContents';
import useProviderAndSigner from './hooks/useProviderAndSigner';
import useWallet from './hooks/useWallet';

// Enums (must be exported as objects, NOT types)
import { AddressWidgetButtons } from './enums/AddressWidgetButtons';
import { Chain } from './enums/Chain';
import { EthosConnectStatus } from './enums/EthosConnectStatus';

// Types, interfaces, and enums
import { ProviderAndSigner } from './types/ProviderAndSigner';
import { Signer } from './types/Signer';
import { Wallet } from './types/Wallet';
import { SuiNFT, Token, WalletContents } from './types/WalletContents';

import DetachedEthosConnectProvider from './components/DetachedEthosConnectProvider';
import useContext from './hooks/useContext';

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
  signTransactionBlock,
  executeTransactionBlock,
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
  getSuiName,
  getSuiAddress,
  formatBalance,
  truncateMiddle,
  ipfsConversion,

  components,

  enums
}

export {
  EthosConnectProvider,
  DetachedEthosConnectProvider,
  SignInButton,
  ethos,
  EthosConnectStatus,
  TransactionBlock,
  verifyMessage,
  IntentScope,
  Chain
};

export type {
  Wallet,
  WalletAccount,
  WalletContents,
  ProviderAndSigner,
  Signer,
  SuiNFT,
  Token
};


