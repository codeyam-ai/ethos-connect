import React, { useEffect, useMemo, useRef, useState, Children, isValidElement, cloneElement, ReactNode } from 'react'
import { EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'
import log from '../lib/log'
import { Chain } from '../enums/Chain'
import ProviderAndSignerContext from './ProviderAndSignerContext'
import ContentsContext from './ContentsContext'
import useAccount from '../hooks/useAccount'
import { ProviderAndSigner } from '../types/ProviderAndSigner'
import useConnect from '../hooks/useConnect'
import SignInModal from './styled/SignInModal'
import ModalContext from './ModalContext'

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

  const [href, setHref] = useState<string | undefined>()
  const hrefRef = useRef<string | undefined>();
  const { providerAndSigner, logout } = useConnect()
  const { contents } = useAccount(providerAndSigner.signer)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalState = useMemo(() => ({ isModalOpen, setIsModalOpen }), [isModalOpen, setIsModalOpen])

  useEffect(() => {
    if (!providerAndSigner?.provider) return;
    log('EthosWrapper', 'calling onWalletConnected', providerAndSigner)

    if (providerAndSigner.signer) {
      providerAndSigner.signer.onlogout = logout;
    }

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
        <ModalContext.Provider value={modalState}>
          {childrenWithProviderAndSigner}
          <SignInModal
          hideEmailSignIn={ethosConfiguration.hideEmailSignIn}
          hideWalletSignIn={ethosConfiguration.hideWalletSignIn}
          />
        </ModalContext.Provider>
      </ContentsContext.Provider>
    </ProviderAndSignerContext.Provider>
  )
}

export default EthosWrapper
