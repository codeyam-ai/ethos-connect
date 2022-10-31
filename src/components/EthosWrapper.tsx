import React, { 
  useEffect, 
  useMemo,
  useState,
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
import SignInModal from './styled/SignInModal'
import ModalContext from './ModalContext'

export interface EthosWrapperProps {
  ethosConfiguration: EthosConfiguration
  onWalletConnected?: ({ provider, signer }: ProviderAndSigner) => void,
  connectMessage?: string | ReactNode
  dappName?: string
  dappIcon?: string | ReactNode
  children: ReactNode
}

const EthosWrapper = ({ ethosConfiguration, onWalletConnected, connectMessage, dappName, dappIcon, children }: EthosWrapperProps) => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalState = useMemo(() => ({ isModalOpen, setIsModalOpen }), [isModalOpen, setIsModalOpen])

  useEffect(() => {
    if (!providerAndSigner?.provider) return;
    log('EthosWrapper', 'calling onWalletConnected', providerAndSigner)

    if (providerAndSigner.signer) {
        const rawDisconnect = providerAndSigner.signer.disconnect;
        providerAndSigner.signer.disconnect = () => {
            rawDisconnect();
            logout();
        }
    }

    onWalletConnected && onWalletConnected(providerAndSigner)
  }, [providerAndSigner])
  
  return (
    <WalletsContext.Provider value={{ wallets, selectWallet }}>
        <ProviderAndSignerContext.Provider value={providerAndSigner}>
            <ContentsContext.Provider value={contents}>
                <ModalContext.Provider value={modalState}>
                    {children}

                    <SignInModal
                        isOpen={isModalOpen}
                        hideEmailSignIn={ethosConfiguration.hideEmailSignIn}
                        hideWalletSignIn={ethosConfiguration.hideWalletSignIn}
                        connectMessage={connectMessage}
                        dappName={dappName}
                        dappIcon={dappIcon}
                    />
                </ModalContext.Provider>
            </ContentsContext.Provider>
        </ProviderAndSignerContext.Provider>
    </WalletsContext.Provider>
  ) 
}

export default EthosWrapper
