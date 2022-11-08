import React, { 
  useEffect, 
  useMemo,
  useState,
  ReactNode 
} from 'react'
import { EthosConfiguration } from 'types/EthosConfiguration'
import lib from '../lib/lib'
import log from '../lib/log'
import { Chain } from '../enums/Chain'
import ProviderAndSignerContext from './ProviderAndSignerContext'
import ContentsContext from './ContentsContext'
import WalletsContext, { WalletContextContent } from './WalletContext'
import useAccount from '../hooks/useAccount'
import { ProviderAndSigner } from '../types/ProviderAndSigner'
import useConnect from '../hooks/useConnect'
import SignInModal from './styled/SignInModal'
import ModalContext from './ModalContext'
import { EthosConnectStatus } from '../types/EthosConnectStatus'

export interface EthosConnectProviderProps {
  ethosConfiguration?: EthosConfiguration
  onWalletConnected?: ({ provider, signer }: ProviderAndSigner) => void,
  connectMessage?: string | ReactNode
  dappName?: string
  dappIcon?: string | ReactNode
  children: ReactNode
}

const EthosConnectProvider = ({ ethosConfiguration, onWalletConnected, connectMessage, dappName, dappIcon, children }: EthosConnectProviderProps) => {
  
    if (!ethosConfiguration) ethosConfiguration = {};
    if (!ethosConfiguration?.chain) ethosConfiguration.chain = Chain.Sui;
    if (!ethosConfiguration?.network) ethosConfiguration.network = 'sui';
    if (!ethosConfiguration?.walletAppUrl) ethosConfiguration.walletAppUrl = 'https://ethoswallet.xyz';

    log('EthosConnectProvider', 'EthosConnectProvider Configuration:', ethosConfiguration)
  
    useEffect(() => {
        lib.initializeEthos(ethosConfiguration || {})
    }, [])
  
    const { wallets, selectWallet, providerAndSigner, logout } = useConnect()
    const { address, contents } = useAccount(providerAndSigner.signer)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const modalState = useMemo(() => ({ isModalOpen, setIsModalOpen }), [isModalOpen, setIsModalOpen])

    const walletContext = useMemo(() => {
        const { provider, signer } = providerAndSigner;
        let status;
        if (provider) {
            if (signer) {
                status = EthosConnectStatus.Connected
            } else {
                status = EthosConnectStatus.NoConnection
            }
        } else {
            status = EthosConnectStatus.Loading
        }
        const context: WalletContextContent = {
            status,
            wallets,
            selectWallet,
            provider
        }
        
        if (signer) {
            context.wallet = {
                ...signer,
                address,
                contents
            }
        }
        
        return context;
    }, [
        wallets, 
        selectWallet, 
        address,
        providerAndSigner,
        contents,
        logout
    ])

    useEffect(() => {
        if (!providerAndSigner?.provider) return;
        log('EthosConnectProvider', 'calling onWalletConnected', providerAndSigner)

        if (providerAndSigner.signer) {
            setIsModalOpen(false);
            const rawDisconnect = providerAndSigner.signer.disconnect;
            providerAndSigner.signer.disconnect = async () => {
                await rawDisconnect();
                logout();
            }
        }

        onWalletConnected && onWalletConnected(providerAndSigner)
    }, [providerAndSigner])

    useEffect(() => {
        if (isModalOpen) {
            document.getElementsByTagName('html').item(0)?.setAttribute('style', 'overflow: hidden;')
        } else {
            document.getElementsByTagName('html').item(0)?.setAttribute('style', '')
        }
    }, [isModalOpen])
    
    useEffect(() => {
        setLoading(false)
    }, []);

    if (loading) {
        return <></>
    }
    
    return (
        <WalletsContext.Provider value={walletContext}>
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

export default EthosConnectProvider
