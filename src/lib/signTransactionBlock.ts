import log from './log'

import type { EthosSignTransactionBlockInput } from '../types/EthosSignTransactionBlockInput';
import { ExtensionSigner, HostedSigner } from '../types/Signer';

type TransactArgs = {
  signer: HostedSigner | ExtensionSigner
  transactionInput: EthosSignTransactionBlockInput
}

const signTransactionBlock = async ({
  signer,
  transactionInput
}: TransactArgs) => {
  log("transact", "Starting transaction", signer, transactionInput)
  return signer.signTransactionBlock(transactionInput)
}

export default signTransactionBlock
