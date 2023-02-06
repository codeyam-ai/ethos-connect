import { SignableTransaction } from '@mysten/sui.js'
import log from './log'
import { SignAndExecuteTransactionOptions } from '../types/Signer'

type TransactArgs = {
  signer: any
  signableTransaction: SignableTransaction
  options?: SignAndExecuteTransactionOptions
}

const transact = async ({
  signer,
  signableTransaction,
  options
}: TransactArgs) => {
  log("transact", "Starting transaction", signer, signableTransaction)
  return signer.signAndExecuteTransaction(signableTransaction, options)
}

export default transact
