import React, { 
  ReactNode 
} from 'react'
import { EthosConfiguration } from 'types/EthosConfiguration'
import { ProviderAndSigner } from '../types/ProviderAndSigner'
import SignInModal from './styled/SignInModal'
import ConnectContext from './ConnectContext'
import useValue from '../hooks/useContext'

export interface EthosConnectProviderProps {
  ethosConfiguration?: EthosConfiguration
  onWalletConnected?: ({ provider, signer }: ProviderAndSigner) => void,
  connectMessage?: string | ReactNode
  dappName?: string
  dappIcon?: string | ReactNode
  children: ReactNode
}

const EthosConnectProvider = ({ ethosConfiguration, onWalletConnected, connectMessage, dappName, dappIcon, children }: EthosConnectProviderProps) => {
    const value = useValue(ethosConfiguration, onWalletConnected);
    
    return (
        <ConnectContext.Provider value={{ setContext: () => {}, ...value }}>
            {children}

            <SignInModal
                isOpen={value.modal.isModalOpen}
                hideEmailSignIn={value.ethosConfiguration.hideEmailSignIn}
                hideWalletSignIn={value.ethosConfiguration.hideWalletSignIn}
                connectMessage={connectMessage}
                dappName={dappName}
                dappIcon={dappIcon}
            />
        </ConnectContext.Provider>
    ) 
}

export default EthosConnectProvider
