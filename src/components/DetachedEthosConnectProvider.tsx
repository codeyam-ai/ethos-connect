import React, { 
  ReactNode 
} from 'react'
import SignInModal from './styled/SignInModal'

export interface DetachedEthosConnectProviderProps {
  context: any,
  connectMessage?: string | ReactNode
  dappName?: string
  dappIcon?: string | ReactNode
  children: ReactNode
}

const DetachedEthosConnectProvider = ({ context, connectMessage, dappName, dappIcon, children }: DetachedEthosConnectProviderProps) => {
    return (
        <>
            {children}

            <SignInModal
                isOpen={context.modal.isModalOpen}
                hideEmailSignIn={context.ethosConfiguration?.hideEmailSignIn || false}
                hideWalletSignIn={context.ethosConfiguration?.hideWalletSignIn || false}
                connectMessage={connectMessage}
                dappName={dappName}
                dappIcon={dappIcon}
                externalContext={context}
            />
        </>
    ) 
}

export default DetachedEthosConnectProvider
