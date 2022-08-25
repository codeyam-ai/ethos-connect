import React, { useEffect } from 'react'
import { EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'
import log from '../lib/log'
import { Chain } from '../enums/Chain'
import ProviderAndSignerContext from './ProviderAndSignerContext'
import useAccount from '../hooks/useAccount'
import { ProviderAndSigner } from '../types/ProviderAndSigner'
import useConnect from '../hooks/useConnect'

export interface EthosWrapperProps extends React.HTMLAttributes<HTMLButtonElement> {
  ethosConfiguration: EthosConfiguration
  onWalletConnected: ({ provider, signer }: ProviderAndSigner) => void
}

const EthosWrapper = ({ ethosConfiguration, onWalletConnected, children }: EthosWrapperProps) => {
  // Set defaults
  if (!ethosConfiguration.chain) ethosConfiguration.chain = Chain.Sui;
  if (!ethosConfiguration.network) ethosConfiguration.network = 'sui';
  if (!ethosConfiguration.walletAppUrl) ethosConfiguration.walletAppUrl = 'https://ethoswallet.xyz/';

  log('EthosWrapper', 'EthosWrapper Configuration:', ethosConfiguration)

  useEffect(() => {
    initialize(ethosConfiguration)
  }, [])
  
  const { providerAndSigner, updateProviderAndSigner } = useConnect()
  const account = useAccount(providerAndSigner)

  useEffect(() => {
    if (!providerAndSigner?.provider) return;
    log('EthosWrapper', 'calling onWalletConnected', providerAndSigner)
    onWalletConnected && onWalletConnected(providerAndSigner)
  }, [providerAndSigner])

  useEffect(() => {
    if (!account) return;
    
    log('EthosWrapper', 'account changed, updating providerAndSigner', account)
    updateProviderAndSigner({ contents: account.contents })
  }, [account])

  const childrenWithProviderAndSigner = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...providerAndSigner })
    }
    return child
  })
  
  return (
    <ProviderAndSignerContext.Provider value={providerAndSigner}>
      {childrenWithProviderAndSigner}
    </ProviderAndSignerContext.Provider>
  ) 
}

export default EthosWrapper
