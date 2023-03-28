import log from './log'

import type { EthosSignAndExecuteTransactionBlockInput } from '../types/EthosSignAndExecuteTransactionBlockInput';
import { ExtensionSigner, HostedSigner } from '../types/Signer';

type TransactArgs = {
  signer: HostedSigner | ExtensionSigner
  transactionInput: EthosSignAndExecuteTransactionBlockInput
}

const transact = async ({
  signer,
  transactionInput
}: TransactArgs) => {
  log("transact", "Starting transaction", signer, transactionInput)
  return signer.signAndExecuteTransactionBlock(transactionInput)
}

export default transact
