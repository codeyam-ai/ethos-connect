import apiCall from './apiCall';

const walletContents = async (address) => {
  const { json: { nfts }, status } = await apiCall({
    relativePath: `nfts/${address}`
  })

  if (status !== 200) {
    console.log("Error with wallet contents", status);
    return;
  }

  return nfts;
}

export default walletContents;