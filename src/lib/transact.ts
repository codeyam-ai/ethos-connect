import {
  SuiCoinTransferTransaction,
  SuiObjectTransferTransaction,
  SuiFunctionTransaction,
  SuiSignedTransaction,
  BulkSuiTransaction
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
    | SuiSignedTransaction
    | BulkSuiTransaction
  onPopulated?: ({ id, data }: { id?: string, data: any }) => void
  onSigned?: ({ id, data }: { id?: string, data: any }) => void
  onSent?: ({ id, data }: { id?: string, data: any }) => void
  onCompleted?: ({ id, data }: { id?: string, data: any }) => void
  onConfirmed?: ({ id, data }: { id?: string, data: any }) => void
  onCanceled?: ({ id }: { id?: string }) => void
}

const transact = async ({
  id: transactionId,
  signer,
  details,
  onPopulated,
  onSigned,
  onSent,
  onCompleted,
  onConfirmed,
  onCanceled,
}: transactArgs) => {
  log("transact", "Starting transaction", signer, details)
  
  if (signer.extension) {
    const response = await signer.transact(details)
    onCompleted && onCompleted({ data: response })
    return response;
  }

  return new Promise((resolve, reject) => {
    const { walletAppUrl } = getConfiguration()

    const transactionEventListener = (message: any) => {
      if (message.origin === walletAppUrl) {
        const { id, action, data } = message.data
        if (action !== 'transact') return
        if (id && id != transactionId) return;

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
            if (onCompleted) onCompleted({ id, data: response })
            window.removeEventListener('message', transactionEventListener)
            resolve(response);
            break
          case 'confirmed':
            if (onConfirmed) onConfirmed({ id, data: response })
            window.removeEventListener('message', transactionEventListener)
            break
          case 'canceled':
            if (onCanceled) onCanceled({ id })
            window.removeEventListener('message', transactionEventListener)
            reject({ error: "User rejected transaction."})
            break
          default:
            break
        }
      }
    }

    window.addEventListener('message', transactionEventListener)

    log("transact", "Posting transaction", signer, details)
    postIFrameMessage({
      id: transactionId,
      action: 'transact',
      data: { details },
    })

    getIframe(true)
  })
}

export default transact
