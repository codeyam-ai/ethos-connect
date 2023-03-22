import log from './log'

import type { EthosSignAndExecuteTransactionInput } from 'types/EthosSignAndExecuteTransactionInput';

type TransactArgs = {
  signer: any
  transactionInput: EthosSignAndExecuteTransactionInput
}

const transact = async ({
  signer,
  transactionInput
}: TransactArgs) => {
  log("transact", "Starting transaction", signer, transactionInput)
  return signer.signAndExecuteTransaction(transactionInput)
}

export default transact
