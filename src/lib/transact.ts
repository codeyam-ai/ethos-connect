import {
  EthereumTransaction,
  SuiCoinTransferTransaction,
  SuiObjectTransferTransaction,
  SuiFunctionTransaction,
} from 'types/Transaction'
import apiCall from './apiCall'
import getConfiguration from './getConfiguration'
import getIframe from './getIframe'
import postMessage from './postMessage'

const confirmBlockNumber = async (address: string, blockNumber: string) => {
  return new Promise(async (resolve) => {
    const {
      json: { nfts },
    } = await apiCall({
      relativePath: `nfts/${address}`,
    })

    for (const nft of nfts.result) {
      if ((nft.block_number_minted || '').toString() === blockNumber.toString()) {
        resolve(nft)
        return
      }
    }

    setTimeout(async () => {
      const nft = await confirmBlockNumber(address, blockNumber)
      if (nft) resolve(nft)
    }, 10000)
  })
}

type transactProps = {
  signer: any
  details:
    | EthereumTransaction
    | SuiCoinTransferTransaction
    | SuiObjectTransferTransaction
    | SuiFunctionTransaction
  onSigned?: (data: any) => void
  onSent?: (data: any) => void
  onComplete?: (data: any) => void
  onConfirmed?: (data: any) => void
  onCanceled?: () => void
}

const transact = async ({
  signer,
  details,
  onSigned,
  onSent,
  onComplete,
  onConfirmed,
  onCanceled,
}: transactProps) => {
  if (signer.extension) {
    const response = signer.transact(details)
    onComplete && onComplete(response)
    return
  }

  const { walletAppUrl } = getConfiguration()

  window.addEventListener('message', (message) => {
    if (message.origin === walletAppUrl) {
      const { action, data } = message.data

      switch (action) {
        case 'signed':
          if (onSigned) onSigned(data)
          break
        case 'sent':
          if (onSent) onSent(data)
          break
        case 'complete':
          if (onComplete) onComplete(data)
          break
        case 'confirmed':
          if (onConfirmed) onConfirmed(data)
          break
        case 'canceled':
          if (onCanceled) onCanceled()
          break
        default:
          break
      }
    }
  })

  postMessage({
    action: 'transact',
    data: { details },
  })

  getIframe(true)
}

export default transact
