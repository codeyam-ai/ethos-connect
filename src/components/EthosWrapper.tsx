import React from 'react'
import { WagmiConfig, createClient, defaultChains, configureChains } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Chain } from '../enums/Chain'
import { EthereumConfiguration, EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'

export interface EthosWrapperProps extends React.HTMLAttributes<HTMLButtonElement> {
  ethosConfiguration: EthosConfiguration
}

const EthosWrapper = ({ ethosConfiguration, children }: EthosWrapperProps) => {
  initialize(ethosConfiguration)

  if (ethosConfiguration.chain === Chain.Eth) {
    const ethConfiguration = ethosConfiguration as EthereumConfiguration
    const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
      alchemyProvider({ alchemyId: ethConfiguration.alchemyId }),
      publicProvider(),
    ])

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

    return <WagmiConfig client={client}>{children}</WagmiConfig>
  }

  return <>{children}</>
}

export default EthosWrapper
