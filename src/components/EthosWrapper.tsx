import React, { useEffect } from 'react'
import { ethers } from 'ethers'
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  useAccount,
  useProvider,
  useSigner,
} from 'wagmi'
import { Provider } from '../lib/ethersWrapper/Provider'
import getProvider from '../lib/getProvider'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { Chain } from '../enums/Chain'
import { EthereumConfiguration, EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'

export type ProviderAndSigner = {
  provider: ethers.providers.Web3Provider | any | undefined
  signer: any
}
export interface EthosWrapperProps extends React.HTMLAttributes<HTMLButtonElement> {
  ethosConfiguration: EthosConfiguration
  onProviderSelected: ({ provider, signer }: ProviderAndSigner) => void
}

const EthosWrapper = ({ ethosConfiguration, onProviderSelected, children }: EthosWrapperProps) => {
  console.log('EthosWrapper', ethosConfiguration)
  initialize(ethosConfiguration)

  const eth = ethosConfiguration.chain === Chain.Eth

  if (eth) {
    const provider = useProvider()
    const { address } = useAccount()
    const { data: signer } = useSigner()
    const ethConfiguration = ethosConfiguration as EthereumConfiguration
    const {
      chains,
      provider: chainsProvider,
      webSocketProvider,
    } = configureChains(defaultChains, [
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
      provider: chainsProvider,
      webSocketProvider,
    })

    if (!address) {
      onProviderSelected({ provider, signer: null })
    } else if (signer) {
      const fullProvider = new Provider(provider, signer)
      onProviderSelected({ provider: fullProvider, signer })
    }

    return <WagmiConfig client={client}>{children}</WagmiConfig>
  }

  useEffect(() => {
    const fetchEthosProvider = async () => {
      const ethosProvider = await getProvider()
      onProviderSelected({
        provider: ethosProvider,
        signer: ethosProvider?.getSigner(),
      })
    }

    fetchEthosProvider()
  }, [])

  return <>{children}</>
}

export default EthosWrapper
