import React from 'react'
import { create, act } from 'react-test-renderer'

import EthosConnectProvider from '../../src/components/EthosConnectProvider'
import { Chain } from '../../src/enums/Chain'
import { EthosConfiguration } from '../../src/types/EthosConfiguration'
import lib from '../../src/lib/lib';
import { SignerType } from '../../src/types/Signer'
import sui from '../../__mocks__/sui.mock'
import { HostedSigner } from '../../src/types/Signer';
import BigNumber from 'bignumber.js';
import { DEFAULT_CHAIN, DEFAULT_NETWORK } from '../../src/lib/constants';
import type { SuiSignMessageOutput, WalletAccount } from '@mysten/wallet-standard';
import {SuiClient} from '@mysten/sui.js/client'

jest.mock('@mysten/sui.js/client')
const mockSuiClient = jest.mocked(SuiClient)

describe('EthosConnectProvider', () => {
  let signer
  let receivedClient
  let receivedSigner
  let onWalletConnected

  beforeEach(() => {
    signer = {
      type: SignerType.Hosted,
      getAddress: () => Promise.resolve("ADDRESS"),
      accounts: [] as readonly WalletAccount[],
      currentAccount: null,
      getAccounts: () => Promise.resolve([]),
      signAndExecuteTransactionBlock: (_transactionBlock) => Promise.resolve({} as any),
      signTransactionBlock: (_transactionBlock) => Promise.resolve({} as any),
      executeTransactionBlock: (_transactionBlock) => Promise.resolve({} as any),
      requestPreapproval: (_preApproval) => Promise.resolve(true),
      signMessage: (_message) => Promise.resolve({} as SuiSignMessageOutput),
      disconnect: () => {},
      logout: () => {},
      // This client instance does not matter, the one created in useConnect
      // is the one that actually gets used. An eventual test refactor could
      // clean this test suite up.
      client: new SuiClient({url: 'fake-url'})
    } as HostedSigner

    jest.spyOn(lib, 'getEthosSigner').mockImplementation(() => {
      return Promise.resolve(signer)
    })

    onWalletConnected = jest.fn(({ client: c, signer: s }) => {
      receivedClient = c
      receivedSigner = s
    });

    jest.spyOn(lib, 'getWalletContents').mockReturnValue(Promise.resolve({
      suiBalance: new BigNumber(0),
      balances: {},
      tokens: {},
      nfts: [],
      objects: [],
    }))
  })

  afterEach(() => {
    receivedClient = null
    receivedSigner = null
    mockSuiClient.mockClear();
  })

  it('renders nothing but the children provided', async () => {
    let ethosWrapper
    await act(async () => {
      ethosWrapper = create(
        <EthosConnectProvider ethosConfiguration={{}} onWalletConnected={onWalletConnected}>
          test
        </EthosConnectProvider>
      )
    })

    expect(ethosWrapper.toJSON()).toMatchSnapshot()
  })

  it('calls the onWalletConnected callback', async () => {
    await act(async () => {
      create(
        <EthosConnectProvider ethosConfiguration={{ apiKey: "test" }} onWalletConnected={onWalletConnected}>
          test
        </EthosConnectProvider>
      )
    })

    expect(onWalletConnected.mock.calls.length).toBe(1)
    // The first call is from the mock above, and is not important.
    expect(mockSuiClient).toHaveBeenCalledTimes(2);
    const mockInstanceFromSignerMock = mockSuiClient.mock.instances[0]
    const mockInstanceFromUseConnect = mockSuiClient.mock.instances[1]
    expect(receivedClient).toEqual(mockInstanceFromUseConnect)
    expect(receivedSigner).toBe(signer)
  })

  it('should initialize default configuration if no optional values are given', async () => {
    const initialEthosConfiguration: EthosConfiguration = { apiKey: 'test-id' }
    const expectedEthosConfiguration: EthosConfiguration = {
      apiKey: 'test-id',
      walletAppUrl: 'https://ethoswallet.xyz',
      chain: DEFAULT_CHAIN,
      network: DEFAULT_NETWORK
    }

    const initializeSpy = jest.spyOn(lib, 'initializeEthos')

    await act(async () => {
      create(
        <EthosConnectProvider ethosConfiguration={initialEthosConfiguration} onWalletConnected={onWalletConnected}>
          test
        </EthosConnectProvider>
      )
    })

    expect(initializeSpy).toBeCalledWith(expectedEthosConfiguration)
  });
})
