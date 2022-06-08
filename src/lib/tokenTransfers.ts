import { TokenTransferInformation } from 'types/TokenTransferInformation'
import apiCall from './apiCall'

type TokenTransfersProps = {
  network: string
  walletAddress: string
  contractAddress: string
  contractABI: any
}

const tokenTransfers = async ({
  network,
  walletAddress,
  contractAddress,
  contractABI,
}: TokenTransfersProps): Promise<TokenTransferInformation> => {
  const {
    json: { transferInformation },
  } = await apiCall({
    relativePath: 'contracts/transfers',
    method: 'POST',
    body: { network, walletAddress, contractAddress, contractABI },
  })

  return transferInformation
}

export default tokenTransfers
