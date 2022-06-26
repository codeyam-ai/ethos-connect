import React from 'react'
import Button from '../headless/Button'
import SignInModal from './SignInModal'
import { WagmiConfig, createClient, defaultChains, configureChains } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ alchemyId: 'rFuRqqP4t7WQ0hFHrN6h7HdVXOatTnBV' }),
  publicProvider(),
])

// Set up client
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'wagmi',
    //   },
    // }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: 'Injected',
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  provider,
  webSocketProvider,
})

const SignInButton = (props: any) => {
  const { appId, children, onClick, onEmailSent, onProviderSelected, ...reactProps } = props

  const [isOpen, setIsOpen] = React.useState(false)

  const _onClick = (e: any) => {
    setIsOpen(true)

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <WagmiConfig client={client}>
      <SignInModal
        isOpen={isOpen}
        onEmailSent={onEmailSent}
        onProviderSelected={onProviderSelected}
        onClose={() => setIsOpen(false)}
      />
      <Button onClick={_onClick} isWorking={isOpen} {...reactProps}>
        {props.children || <>Sign In</>}
      </Button>
    </WagmiConfig>
  )
}
export default SignInButton
