import { ethers } from 'ethers'

// For typescript to ignore the 'window.ethereum' compilation error when connecting to metamask
declare global {
  interface Window {
    ethereum: any
  }
}

const connectMetaMask = async (): Promise<ethers.providers.Web3Provider | undefined> => {
  if (typeof window === undefined) {
    return
  }

  await window.ethereum.enable()
  return new ethers.providers.Web3Provider(window.ethereum)
}

export default connectMetaMask
