import * as apiCall from '../../src/lib/apiCall'
import ethBalance from '../../src/lib/ethBalance'

describe('register', () => {
  it('should register a new user', async () => {
    const expectedBalanceInEther = '0.01'
    const apiCallReturn = {
      json: { balance: expectedBalanceInEther.toString() },
      status: 200,
    }

    const spyApiCall = jest.spyOn(apiCall, 'default').mockResolvedValueOnce(apiCallReturn)

    const actualBalanceInEther = await ethBalance({ network: '1', address: '0x0' })

    expect(spyApiCall).toBeCalledTimes(1)
    expect(actualBalanceInEther).toEqual(expectedBalanceInEther)
  })
})
