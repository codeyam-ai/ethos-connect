import apiCall from "./apiCall";

const ethBalance = async ({ network, address }) => {
  const { json: { balance } } = await apiCall({
    relativePath: 'wallet/balance',
    method: 'POST',
    body: { network, address }
  });

  return balance;
}

export default ethBalance;