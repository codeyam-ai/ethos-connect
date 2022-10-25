import { SignableTransaction } from '@mysten/sui.js'
import log from './log'

type TransactArgs = {
  signer: any
  signableTransaction: SignableTransaction
}

const transact = async ({
  signer,
  signableTransaction
}: TransactArgs) => {
  log("transact", "Starting transaction", signer, signableTransaction)
  return signer.signAndExecuteTransaction(signableTransaction)
}

export default transact
