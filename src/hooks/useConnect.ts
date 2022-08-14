import { useCallback, useEffect, useRef, useState } from 'react'
import log from '../lib/log'
import useSuiWallet from './useSuiWallet' 
import getProvider from '../lib/getProvider'
import listenForMobileConnection from '../lib/listenForMobileConnection'
import { ProviderAndSigner } from '../types/ProviderAndSigner'

const useConnect = () => {
  const signerFound = useRef<boolean>(false)
  const methodsChecked = useRef<any>({
    'ethos': false,
    'mobile': false,
    'extension': false
  })

  const [providerAndSigner, setProviderAndSigner] = useState<ProviderAndSigner>({
    provider: null,
    signer: null,
    contents: null
  })
  const suiProviderAndSigner = useSuiWallet()

  const selectProviderAndSigner = useCallback((providerAndSigner: ProviderAndSigner, type?: string) => {
    if (signerFound.current) return;
    
    if (type) {
      methodsChecked.current[type] = true;
    }
    
    const allMethodsChecked = !Object.values(methodsChecked.current).includes(false)
    if (!providerAndSigner.signer && !allMethodsChecked) return;
    
    if (providerAndSigner.signer) {
      signerFound.current = true;
    }

    setProviderAndSigner(providerAndSigner)
  }, []);

  const updateProviderAndSigner = useCallback((updates) => {
    setProviderAndSigner(
      (prev: ProviderAndSigner) => ({
        ...prev,
        ...updates
      })
    )
  }, [])

  useEffect(() => {
    log("mobile", "listening to mobile connection from EthosWrapper")
    listenForMobileConnection(
      (mobileProviderAndSigner: any) => {
        log('EthosWrapper', 'Setting _onProviderSelected1')
        log("mobile", "Setting provider and signer", mobileProviderAndSigner)
        selectProviderAndSigner(mobileProviderAndSigner, 'mobile')
      }
    )
  }, [selectProviderAndSigner])

  useEffect(() => {
    if (!suiProviderAndSigner) return

    selectProviderAndSigner(suiProviderAndSigner, 'extension')
  }, [suiProviderAndSigner, selectProviderAndSigner])

  useEffect(() => { 
    const fetchEthosProvider = async () => {
      const ethosProvider = await getProvider()
      selectProviderAndSigner({
        provider: ethosProvider,
        signer: ethosProvider?.getSigner(),
        contents: null
      }, 
      'ethos'
    )}

    fetchEthosProvider()
  }, [selectProviderAndSigner])

  return { providerAndSigner, updateProviderAndSigner };
}

export default useConnect;