import {
  SuiCoinTransferTransaction,
  SuiObjectTransferTransaction,
  SuiFunctionTransaction,
} from 'types/Transaction'
import apiCall from './apiCall'
import getConfiguration from './getConfiguration'
import getIframe from './getIframe'
import postIFrameMessage from './postIFrameMessage'
import log from './log'

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

type transactArgs = {
  id?: string
  signer: any
  details:
    | SuiCoinTransferTransaction
    | SuiObjectTransferTransaction
    | SuiFunctionTransaction
  onPopulated?: ({ id, data }: { id?: string, data: any }) => void
  onSigned?: ({ id, data }: { id?: string, data: any }) => void
  onSent?: ({ id, data }: { id?: string, data: any }) => void
  onComplete?: ({ id, data }: { id?: string, data: any }) => void
  onConfirmed?: ({ id, data }: { id?: string, data: any }) => void
  onCanceled?: ({ id }: { id?: string }) => void
}

const transact = async ({
  id,
  signer,
  details,
  onPopulated,
  onSigned,
  onSent,
  onComplete,
  onConfirmed,
  onCanceled,
}: transactArgs) => {
  log("transact", "Starting transaction", signer, details)
  if (signer.extension) {
    const response = signer.transact(details)
    onComplete && onComplete(response)
    return
  }

  const { walletAppUrl } = getConfiguration()

  const transactionEventListener = (message: any) => {
    if (message.origin === walletAppUrl) {
      const { id, action, data } = message.data
      if (action !== 'transact') return

      const { state, response } = data

      switch (state) {
        case 'populated':
          if (onPopulated) onPopulated({ id, data: response })
          break
        case 'signed':
          if (onSigned) onSigned({ id, data: response })
          break
        case 'sent':
          if (onSent) onSent({ id, data: response })
          break
        case 'complete':
          if (onComplete) onComplete({ id, data: response })
          window.removeEventListener('message', transactionEventListener)
          break
        case 'confirmed':
          if (onConfirmed) onConfirmed({ id, data: response })
          window.removeEventListener('message', transactionEventListener)
          break
        case 'canceled':
          if (onCanceled) onCanceled({ id })
          window.removeEventListener('message', transactionEventListener)
          break
        default:
          break
      }
    }
  }

  window.addEventListener('message', transactionEventListener)

  log("transact", "Posting transaction", signer, details)
  postIFrameMessage({
    id,
    action: 'transact',
    data: { details },
  })

  getIframe(true)
}

export default transact
