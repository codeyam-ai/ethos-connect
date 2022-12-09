import React, { 
  ReactNode 
} from 'react'
import SignInModal from './styled/SignInModal'


export interface EthosConnectProviderProps {
  context: any,
  connectMessage?: string | ReactNode
  dappName?: string
  dappIcon?: string | ReactNode
  children: ReactNode
}

const EthosConnectProviderForVue = ({ context, connectMessage, dappName, dappIcon, children }: EthosConnectProviderProps) => {
    return (
        <>
            {children}

            <SignInModal
                isOpen={context.modal.isModalOpen}
                hideEmailSignIn={context.ethosConfiguration.hideEmailSignIn}
                hideWalletSignIn={context.ethosConfiguration.hideWalletSignIn}
                connectMessage={connectMessage}
                dappName={dappName}
                dappIcon={dappIcon}
                externalContext={context}
            />
        </>
    ) 
}

export default EthosConnectProviderForVue
