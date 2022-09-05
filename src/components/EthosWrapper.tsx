import React, { useEffect, useMemo, useRef, useState, Children, isValidElement, cloneElement } from 'react'
import { EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'
import log from '../lib/log'
import { Chain } from '../enums/Chain'
import ProviderAndSignerContext from './ProviderAndSignerContext'
import ContentsContext from './ContentsContext'
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
  
  const [href, setHref] = useState<string|undefined>()
  const hrefRef = useRef<string|undefined>();
  const providerAndSigner = useConnect()
  const { contents } = useAccount(providerAndSigner.signer)

  useEffect(() => {
    if (!providerAndSigner?.provider) return;
    log('EthosWrapper', 'calling onWalletConnected', providerAndSigner)
    onWalletConnected && onWalletConnected(providerAndSigner)
  }, [providerAndSigner])

  useEffect(() => {
    const checkLocation = () => {
      const newHref = window.location.href;
      if (newHref !== hrefRef.current) {
        setHref(newHref);
        hrefRef.current = newHref;
      }
    }

    const checkId = setInterval(checkLocation, 100);
    return () => clearInterval(checkId);
  }, []);

  const childrenWithProviderAndSigner = useMemo(() => Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { ...providerAndSigner })
    }
    return child
  }), [providerAndSigner, href]);
  
  return (
    <ProviderAndSignerContext.Provider value={providerAndSigner}>
      <ContentsContext.Provider value={contents}>
        {childrenWithProviderAndSigner}
      </ContentsContext.Provider>
    </ProviderAndSignerContext.Provider>
  ) 
}

export default EthosWrapper
