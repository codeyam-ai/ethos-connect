import log from './log'
import { SignAndExecuteTransactionOptions } from '../types/Signer'

import type { Transaction } from '@mysten/sui.js';

type TransactArgs = {
  signer: any
  transaction: Uint8Array | Transaction
  options?: SignAndExecuteTransactionOptions
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
