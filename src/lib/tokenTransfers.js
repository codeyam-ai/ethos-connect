import apiCall from "./apiCall";

const tokenTransfers = async (network, walletAddress, contractAddress, contractABI) => {
  const { json: { transferInformation } } = await apiCall({
    relativePath: "contracts/transfers",
    method: "POST",
    body: { network, walletAddress, contractAddress, contractABI }
  })

  return transferInformation;
}

export default tokenTransfers;