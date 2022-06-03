import * as apiCall from '../apiCall';
import getBalanceInEther from '../getBalanceInEther';

describe('register', () => {
  it('should register a new user', async () => {
    const expectedBalanceInEther = 0.01;
    const apiCallReturn = {
      json: { balance: expectedBalanceInEther.toString() },
      status: 200,
    };

    const spyApiCall = jest.spyOn(apiCall, 'default').mockResolvedValueOnce(apiCallReturn);

    const actualBalanceInEther = await getBalanceInEther(1, '0x0', 'localhost:3001');

    expect(spyApiCall).toBeCalledTimes(1);
    expect(actualBalanceInEther).toEqual(expectedBalanceInEther);
  });
});
