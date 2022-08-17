import transact from "./transact";
import {
  SuiCoinTransferTransaction,
  SuiObjectTransferTransaction
} from 'types/Transaction'

type transferArgs = {
  signer: any
  details:
    | SuiCoinTransferTransaction
    | SuiObjectTransferTransaction
  onSigned?: (data: any) => void
  onSent?: (data: any) => void
  onComplete?: (data: any) => void
  onConfirmed?: (data: any) => void
  onCanceled?: () => void
}

const transfer = (args: transferArgs) => {
  return transact(args)
}

export default transfer;