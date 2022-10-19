import React, { 
  useEffect, 
  ReactNode 
} from 'react'
import { EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'
import log from '../lib/log'
import { Chain } from '../enums/Chain'
import ProviderAndSignerContext from './ProviderAndSignerContext'
import ContentsContext from './ContentsContext'
import WalletsContext from './WalletContext'
import useAccount from '../hooks/useAccount'
import { ProviderAndSigner } from '../types/ProviderAndSigner'
import useConnect from '../hooks/useConnect'
export interface EthosWrapperProps {
  ethosConfiguration: EthosConfiguration
  onWalletConnected: ({ provider, signer }: ProviderAndSigner) => void
  children: ReactNode
}

const EthosWrapper = ({ ethosConfiguration, onWalletConnected, children }: EthosWrapperProps) => {
  // Set defaults
  if (!ethosConfiguration.chain) ethosConfiguration.chain = Chain.Sui;
  if (!ethosConfiguration.network) ethosConfiguration.network = 'sui';
  if (!ethosConfiguration.walletAppUrl) ethosConfiguration.walletAppUrl = 'https://ethoswallet.xyz';

  log('EthosWrapper', 'EthosWrapper Configuration:', ethosConfiguration)
  
  useEffect(() => {
    initialize(ethosConfiguration)
  }, [])
  
  const { wallets, selectWallet, providerAndSigner, logout } = useConnect()
  const { contents } = useAccount(providerAndSigner.signer)

  useEffect(() => {
    if (!providerAndSigner?.provider) return;
    log('EthosWrapper', 'calling onWalletConnected', providerAndSigner)

    if (providerAndSigner.signer) {
      providerAndSigner.signer.onlogout = logout;
    }

    onWalletConnected && onWalletConnected(providerAndSigner)
  }, [providerAndSigner])
  
  return (
    <WalletsContext.Provider value={{ wallets, selectWallet }}>
        <ProviderAndSignerContext.Provider value={providerAndSigner}>
            <ContentsContext.Provider value={contents}>
                {children}
            </ContentsContext.Provider>
        </ProviderAndSignerContext.Provider>
    </WalletsContext.Provider>
  ) 
}

export default EthosWrapper
