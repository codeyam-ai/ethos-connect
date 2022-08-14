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

  const checkProviderAndSigner = useCallback((providerAndSigner: ProviderAndSigner, type?: string) => {
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
        checkProviderAndSigner(mobileProviderAndSigner, 'mobile')
      }
    )
  }, [checkProviderAndSigner])

  useEffect(() => {
    if (!suiProviderAndSigner) return

    checkProviderAndSigner(suiProviderAndSigner, 'extension')
  }, [suiProviderAndSigner, checkProviderAndSigner])

  useEffect(() => { 
    const fetchEthosProvider = async () => {
      const provider = await getProvider()
      const signer = provider?.getSigner()
      const contents = null;
      checkProviderAndSigner(
        {
          provider,
          signer,
          contents
        }, 
        'ethos'
      )
    }
    
    fetchEthosProvider()
  }, [checkProviderAndSigner])

  return { providerAndSigner, updateProviderAndSigner };
}

export default useConnect;