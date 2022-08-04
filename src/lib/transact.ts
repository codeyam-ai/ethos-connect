import {
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
  console.log("TRANSACT", signer, details)
  if (signer.extension) {
    const response = signer.transact(details)
    onComplete && onComplete(response)
    return
  }

  const { walletAppUrl } = getConfiguration()

  const transactionEventListener = (message: any) => {
    if (message.origin === walletAppUrl) {
      const { action, data } = message.data
      if (action !== 'transact') return

      const { state, response } = data

      switch (state) {
        case 'signed':
          if (onSigned) onSigned(response)
          break
        case 'sent':
          if (onSent) onSent(response)
          break
        case 'complete':
          if (onComplete) onComplete(response)
          window.removeEventListener('message', transactionEventListener)
          break
        case 'confirmed':
          if (onConfirmed) onConfirmed(response)
          window.removeEventListener('message', transactionEventListener)
          break
        case 'canceled':
          if (onCanceled) onCanceled()
          window.removeEventListener('message', transactionEventListener)
          break
        default:
          break
      }
    }
  }

  window.addEventListener('message', transactionEventListener)

  console.log("POST TRANSACTION", details)
  postMessage({
    action: 'transact',
    data: { details },
  })

  getIframe(true)
}

export default transact
