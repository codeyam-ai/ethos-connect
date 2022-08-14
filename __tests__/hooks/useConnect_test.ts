import { act, renderHook } from '@testing-library/react-hooks'
import useConnect from '../../src/hooks/useConnect'

import * as useSuiWallet from '../../src/hooks/useSuiWallet' 
import * as getProvider from '../../src/lib/getProvider'
import * as listenForMobileConnection from '../../src/lib/listenForMobileConnection'

const nullProviderAndSigner = {
  provider: null,
  signer: null,
  contents: null
}

const emptyProvider = {
  getSigner: () => null
}

const providerNoSigner = {
  ...nullProviderAndSigner,
  provider: emptyProvider
}

const signer = {
  getAddress: Promise.resolve("ADDRESS")
}

const providerWithSigner = {
  getSigner: () => signer
}

const providerAndSigner = {
  ...nullProviderAndSigner,
  provider: providerWithSigner,
  signer
}

const contents = {
  balance: 300,
  nfts: []
}

const providerAndSignerAndContents = {
  provider: providerWithSigner,
  signer,
  contents
}

describe('useConnect', () => {
  let resolveProvider, onMobileConnect;

  beforeEach(() => {
    resolveProvider = null;
    onMobileConnect = null;

    jest.spyOn(useSuiWallet, 'default').mockReturnValue(providerNoSigner)

    jest.spyOn(getProvider, 'default').mockReturnValue(new Promise((resolve, reject) => {
      resolveProvider = resolve;
    }));

    jest.spyOn(listenForMobileConnection, 'default').mockImplementation(async (onConnect: any) => {
      onMobileConnect = onConnect;
    })
  })
  
  it("should not set the provider until all methods have been checked", async () => {
    const { result } = renderHook(() => useConnect())

    expect(result.current.providerAndSigner).toStrictEqual(nullProviderAndSigner)

    await act(async () => {
      resolveProvider(emptyProvider)
    })
    expect(result.current.providerAndSigner).toStrictEqual(nullProviderAndSigner)

    await act(async () => {
      onMobileConnect(providerNoSigner)
    })
    expect(result.current.providerAndSigner).toStrictEqual(providerNoSigner)
  })

  it("should set the provider once a provider with a signer is found", async () => {
    const { result } = renderHook(() => useConnect())
    expect(result.current.providerAndSigner).toStrictEqual(nullProviderAndSigner)
    await act(async () => {
      resolveProvider(providerWithSigner)
    })
    expect(result.current.providerAndSigner).toStrictEqual(providerAndSigner)
  })

  it("should update the provider externally", async () => {
    const { result } = renderHook(() => useConnect())
    expect(result.current.providerAndSigner).toStrictEqual(nullProviderAndSigner)
    await act(async () => {
      resolveProvider(providerWithSigner)
    })
    expect(result.current.providerAndSigner).toStrictEqual(providerAndSigner)

    await act(async () => {
      result.current.updateProviderAndSigner({ contents })
    })
    expect(result.current.providerAndSigner).toStrictEqual(providerAndSignerAndContents)
  })
})
