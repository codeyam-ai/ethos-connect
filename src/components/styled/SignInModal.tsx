import React from 'react'
import { ethers } from 'ethers'
import { WagmiConfig, createClient, defaultChains, configureChains } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import WagmiWrappedSignInModal from './WagmiWrappedSignInModal'

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

export type ProviderAndSigner = {
  provider: ethers.providers.Web3Provider | any | undefined
  signer: any
}

export type SignInModalProps = {
  isOpen: boolean
  onClose?: () => void
  onLoaded?: () => void
  onEmailSent?: () => void
  onProviderSelected: ({ provider, signer }: ProviderAndSigner) => void
}

const SignInModal = (props: SignInModalProps) => {
  return (
    <WagmiConfig client={client}>
      <WagmiWrappedSignInModal {...props} />
    </WagmiConfig>
  )
}

export default SignInModal
