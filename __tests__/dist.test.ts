import * as ethosConnect from '../dist/index.cjs'

test('should expose the correct components', () => {
  const exportNames = [
    ethosConnect.EthosConnectProvider.name,
    ethosConnect.DetachedEthosConnectProvider.name,
    ethosConnect.SignInButton.name,
    'ethos',
    'EthosConnectStatus',
    'TransactionBlock',
    'Chain'
  ]

  expect(Object.keys(ethosConnect)).toEqual(exportNames)
})
