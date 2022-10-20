import {
  SuiCoinTransferTransaction,
  SuiObjectTransferTransaction,
  SuiFunctionTransaction,
  SuiSignedTransaction,
  BulkSuiTransaction
} from 'types/Transaction'
import log from './log'

type transactArgs = {
  signer: any
  details:
    | SuiCoinTransferTransaction
    | SuiObjectTransferTransaction
    | SuiFunctionTransaction
    | SuiSignedTransaction
    | BulkSuiTransaction
}

const transact = async ({
  signer,
  details
}: transactArgs) => {
  log("transact", "Starting transaction", signer, details)
  
  return signer.transact(details)
}

export default transact
