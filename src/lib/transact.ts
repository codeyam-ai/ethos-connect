import log from './log'

import type { SuiSignAndExecuteTransactionInput } from '@mysten/wallet-standard';

type TransactArgs = {
  signer: any
  transactionInput: SuiSignAndExecuteTransactionInput
}

const transact = async ({
  signer,
  transactionInput
}: TransactArgs) => {
  log("transact", "Starting transaction", signer, transactionInput)
  return signer.signAndExecuteTransaction(transactionInput)
}

export default transact
