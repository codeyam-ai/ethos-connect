import apiCall from "./apiCall";

const getBalanceInEther = async (network: string, address: string): Promise<number> => {
  const { json: { balance } } = await apiCall({
    relativePath: 'wallet/balance',
    method: 'POST',
    body: { network, address }
  });

  return +balance;
}

export default getBalanceInEther;