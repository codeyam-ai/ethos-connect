import log from './log'

import type { EthosSignAndExecuteTransactionBlockInput } from '../types/EthosSignAndExecuteTransactionBlockInput';

type TransactArgs = {
  signer: any
  transactionInput: EthosSignAndExecuteTransactionBlockInput
}

const transact = async ({
  signer,
  transactionInput
}: TransactArgs) => {
  log("transact", "Starting transaction", signer, transactionInput)
  return signer.signAndExecuteTransaction(transactionInput)
}

export default transact
