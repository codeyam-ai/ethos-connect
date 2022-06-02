import apiCall from "./apiCall";
import { appBaseUrl } from "./constants";
import getIframe from "./getIframe";

const confirmBlockNumber = async (address, blockNumber, host) => {
  return new Promise(
    async (resolve) => {
      const { json: { nfts }, status } = await apiCall({
        relativePath: `nfts/${address}`
      })
      
      for (const nft of nfts.result) {
        if ((nft.block_number_minted || "").toString() === blockNumber.toString()) {
          resolve(nft);
          return;
        }
      }
      
      setTimeout(async () => {
        const nft = await confirmBlockNumber(address, blockNumber)
        if (nft) resolve(nft);
      }, 10000)
    }
  );
}

const transact = async ({appId, network, address, abi, functionName, inputValues, onSigned, onSent, onComplete, onConfirmed}) => {
  window.addEventListener("message", (message) => {
    if (message.origin === appBaseUrl) {
      const { action, data } = message.data;
      
      switch (action) {
        case 'signed':
          if (onSigned) onSigned(data);
          break;
        case 'sent':
          if (onSent) onSent(data);
          break;
        case 'complete':
          if (onComplete) onComplete(data);
          break;
        case 'confirmed':
          if (onConfirmed) onConfirmed(data);
          break;
        default:
          break;
      }
    }
  });

  const iframe = getIframe(appId);
  iframe.contentWindow.postMessage({
    action: 'transact',
    data: {
      network,
      address,
      abi,
      functionName,
      inputValues
    }
  }, appBaseUrl);

  getIframe(appId, true);
}

export default transact;