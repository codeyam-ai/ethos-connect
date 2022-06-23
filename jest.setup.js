globalThis.IS_REACT_ACT_ENVIRONMENT = true

// jest.mock('', () => ({
//   default: jest.fn(() => ({
//     walletAppUrl: "test",
//     appId: 'test',
//     network: 'test'
//   }))
// }))

jest.mock('./src/lib/getConfiguration', () =>
  jest.fn(() => {
    return {
      walletAppUrl: 'test',
      appId: 'test',
      network: 'test',
    }
  })
)
