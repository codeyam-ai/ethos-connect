import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
// import {
//   WagmiConfig,
//   createClient,
//   defaultChains,
//   configureChains,
//   useAccount,
//   useProvider,
//   useSigner,
// } from 'wagmi'
// import { Provider } from '../lib/ethersWrapper/Provider'
import getProvider from '../lib/getProvider'

// import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { publicProvider } from 'wagmi/providers/public'

// import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
// import { InjectedConnector } from 'wagmi/connectors/injected'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import { Chain } from '../enums/Chain'
import { EthosConfiguration } from 'types/EthosConfiguration'
import initialize from '../lib/initialize'
import useSuiWallet from '../lib/useSuiWallet'

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
  // const eth = ethosConfiguration.chain === Chain.Eth

  const [providerAndSigner, setProviderAndSigner] = useState<ProviderAndSigner | null>(null)
  const suiProviderAndSigner = useSuiWallet()

  const _onProviderSelected = (providerAndSigner: ProviderAndSigner) => {
    console.log('SET PROVIDER AND SIGNER!!!!!!!', providerAndSigner)
    setProviderAndSigner(providerAndSigner)
    onProviderSelected && onProviderSelected(providerAndSigner)
  }

  const childrenWithProviderAndSigner = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...providerAndSigner })
    }
    return child
  })

  // if (eth) {
  //   const ethConfiguration = ethosConfiguration as EthereumConfiguration
  //   const provider = useProvider()
  //   const { address } = useAccount()
  //   const { data: signer } = useSigner()
  //   const {
  //     chains,
  //     provider: chainsProvider,
  //     webSocketProvider,
  //   } = configureChains(defaultChains, [
  //     alchemyProvider({ alchemyId: ethConfiguration.alchemyId }),
  //     publicProvider(),
  //   ])

  //   const client = createClient({
  //     autoConnect: true,
  //     connectors: [
  //       new MetaMaskConnector({ chains }),
  //       // new CoinbaseWalletConnector({
  //       //   chains,
  //       //   options: {
  //       //     appName: 'wagmi',
  //       //   },
  //       // }),
  //       new WalletConnectConnector({
  //         chains,
  //         options: {
  //           qrcode: true,
  //         },
  //       }),
  //       // new InjectedConnector({
  //       //   chains,
  //       //   options: {
  //       //     name: 'Injected',
  //       //     shimDisconnect: true,
  //       //   },
  //       // }),
  //     ],
  //     provider: chainsProvider,
  //     webSocketProvider,
  //   })

  //   useEffect(() => {
  //     if (!address) {
  //       _onProviderSelected({ provider, signer: null })
  //     } else if (signer) {
  //       const fullProvider = new Provider(provider, signer)
  //       _onProviderSelected({ provider: fullProvider, signer })
  //     }
  //   }, [])

  //   return <WagmiConfig client={client}>{childrenWithProviderAndSigner}</WagmiConfig>
  // }

  useEffect(() => {
    console.log(suiProviderAndSigner)
    if (!suiProviderAndSigner) return

    const { provider: suiProvider, signer: suiSigner } = suiProviderAndSigner
    if (suiProvider && !suiSigner) {
      console.log('PROVIDER AND SIGNER1', suiProviderAndSigner)
      initialize(ethosConfiguration)

      const fetchEthosProvider = async () => {
        const ethosProvider = await getProvider()
        _onProviderSelected({
          provider: ethosProvider,
          signer: ethosProvider?.getSigner(),
        })
      }

      fetchEthosProvider()
    } else if (suiSigner) {
      console.log('PROVIDER AND SIGNER2', suiProviderAndSigner)
      _onProviderSelected(suiProviderAndSigner)
    }
  }, [suiProviderAndSigner])

  return <>{childrenWithProviderAndSigner}</>
}

export default EthosWrapper
