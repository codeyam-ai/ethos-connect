import log from './log'

import type { Transaction } from '@mysten/sui.js';
import type { SuiSignAndExecuteTransactionOptions } from '@mysten/wallet-standard';

type TransactArgs = {
  signer: any
  transaction: Uint8Array | Transaction
  options?: SuiSignAndExecuteTransactionOptions
}

const transact = async ({
  signer,
  transaction,
  options
}: TransactArgs) => {
  log("transact", "Starting transaction", signer, transaction)
  return signer.signAndExecuteTransaction(transaction, options)
}

export default transact
