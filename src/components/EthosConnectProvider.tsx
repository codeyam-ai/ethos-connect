import React, { 
  ReactNode 
} from 'react'
import { EthosConfiguration } from 'types/EthosConfiguration'
import { ProviderAndSigner } from '../types/ProviderAndSigner'
import SignInModal from './styled/SignInModal'
import ConnectContext from './ConnectContext'
import useContext from '../hooks/useContext'

export interface EthosConnectProviderProps {
  ethosConfiguration?: EthosConfiguration
  onWalletConnected?: ({ provider, signer }: ProviderAndSigner) => void,
  connectMessage?: string | ReactNode
  dappName?: string
  dappIcon?: string | ReactNode
  children: ReactNode
}

const EthosConnectProvider = ({ ethosConfiguration, onWalletConnected, connectMessage, dappName, dappIcon, children }: EthosConnectProviderProps) => {
  const context = useContext({ configuration: ethosConfiguration || {}, onWalletConnected });
    
    return (
        <ConnectContext.Provider value={context}>
            {children}

            <SignInModal
                isOpen={context.modal?.isModalOpen || false}
                hideEmailSignIn={context.ethosConfiguration?.hideEmailSignIn || false}
                hideWalletSignIn={context.ethosConfiguration?.hideWalletSignIn|| false}
                connectMessage={connectMessage}
                dappName={dappName}
                dappIcon={dappIcon}
            />
        </ConnectContext.Provider>
    ) 
}

export default EthosConnectProvider
