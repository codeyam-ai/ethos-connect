import * as ect from '../dist/index'
import * as ethosConnect from '../dist/index.cjs'

test('should expose the correct components', () => {
  const exportNames = [
    ethosConnect.EthosConnectProvider.name,
    ethosConnect.DetachedEthosConnectProvider.name,
    ethosConnect.SignInButton.name,
    'ethos',
    'EthosConnectStatus',
    'TransactionBlock',
    'Chain',
  ]

  exportNames.forEach((eName) => {
    expect(ethosConnect).toHaveProperty(eName)
  })
})

// TODO: add type testing to ensure desired types are present at the moment you
// can uncomment to view type errors in LSP-enabled editors. Actually getting a
// `npm run test:types` working is non-trivial, and would likely involve `npx
// tsc ... --noEmit ...`
//
// test('should exposed desired types', () => {
//   let a: ect.Wallet
//   let b: ect.Chain
//   let c: ect.WalletContextContents
// })