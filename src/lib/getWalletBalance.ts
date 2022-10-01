import getWalletContents from "./getWalletContents";

const getWalletBalance = async (address: string) => {
  const { balance } = await getWalletContents(address);
  return balance;
}

export default getWalletBalance;