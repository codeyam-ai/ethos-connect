import getWalletContents from "./getWalletContents";

const getWalletBalance = async (address: string): Promise<any[]> => {
  const { nfts } = await getWalletContents({ address });
  return nfts;
}

export default getWalletBalance;