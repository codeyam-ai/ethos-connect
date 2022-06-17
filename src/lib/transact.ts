import { PopulatedTransaction } from 'ethers'
import { UnpopulatedTransaction } from 'types/UnpopulatedTransaction'
import apiCall from './apiCall'
import getAppBaseUrl from './getAppBaseUrl'
import getIframe from './getIframe'

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
  appId: string
  network: number
  // This naming is incredibly confusing. Refactor.
  unpopulatedTransaction: PopulatedTransaction
  onSigned?: (data: any) => void
  onSent?: (data: any) => void
  onComplete?: (data: any) => void
  onConfirmed?: (data: any) => void
}

const transact = async ({
  appId,
  network,
  unpopulatedTransaction,
  onSigned,
  onSent,
  onComplete,
  onConfirmed,
}: transactProps) => {
  const walletAppUrl = getAppBaseUrl()

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
        default:
          break
      }
    }
  })

  const iframe = getIframe({ appId })
  iframe?.contentWindow?.postMessage(
    {
      action: 'transact',
      data: {
        network,
        unpopulatedTransaction
      },
    },
    walletAppUrl
  )

  getIframe({ appId, show: true })
}

export default transact
