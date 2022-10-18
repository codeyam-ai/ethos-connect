import React from 'react'
import { create, act } from 'react-test-renderer'

import EthosWrapper from '../../src/components/EthosWrapper'
import * as getWalletContents from '../../src/lib/getWalletContents'
import { Chain } from '../../src/enums/Chain'
import { EthosConfiguration } from '../../src/types/EthosConfiguration'
import * as initialize from '../../src/lib/initialize';
import * as getEthosSigner from '../../src/lib/getEthosSigner'

describe('EthosWrapper', () => {
  const signer = {
    getAddress: () => "ADDRESS"
  }

  let receivedProvider
  let receivedSigner
  let onWalletConnected

  beforeEach(() => {
    jest.spyOn(getEthosSigner as any, 'default').mockImplementation(() => {
      return Promise.resolve({
        signer
      })
    })

    onWalletConnected = jest.fn(({ provider: p, signer: s }) => {
      receivedProvider = p
      receivedSigner = s
    });

    jest.spyOn(getWalletContents as any, 'default').mockReturnValue({
      balance: 0,
      coins: [],
      nfts: []
    })
  })

  afterEach(() => {
    receivedProvider = null
    receivedSigner = null
  })

  it('renders nothing but the children provided', async () => {
    let ethosWrapper
    await act(async () => {
      ethosWrapper = create(
        <EthosWrapper ethosConfiguration={{}} onWalletConnected={onWalletConnected}>
          test
        </EthosWrapper>
      )
    })

    expect(ethosWrapper.toJSON()).toMatchSnapshot()
  })

  it('renders calls the onWalletConnected callback', async () => {
    let ethosWrapper
    await act(async () => {
      ethosWrapper = create(
        <EthosWrapper ethosConfiguration={{}} onWalletConnected={onWalletConnected}>
          test
        </EthosWrapper>
      )
    })

    expect(onWalletConnected.mock.calls.length).toBe(1)
    expect(receivedProvider.getSigner()).toBe(signer)
    expect(receivedSigner).toBe(signer)
  })

  it('should initialize default configuration if no optional values are given', async () => {
    let ethosWrapper: any;
    const initialEthosConfiguration: EthosConfiguration = { appId: 'test-id' }
    const expectedEthosConfiguration: EthosConfiguration = {
      appId: 'test-id',
      walletAppUrl: 'https://ethoswallet.xyz',
      chain: Chain.Sui,
      network: 'sui'
    }

    const initializeSpy = jest.spyOn(initialize, 'default')

    await act(async () => {
      ethosWrapper = create(
        <EthosWrapper ethosConfiguration={initialEthosConfiguration} onWalletConnected={onWalletConnected}>
          test
        </EthosWrapper>
      )
    })

    expect(initializeSpy).toBeCalledWith(expectedEthosConfiguration)
  });
})
