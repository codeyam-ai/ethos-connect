// import log from './log'

import { ExtensionSigner, HostedSigner } from '../types/Signer';
import { EthosExecuteTransactionBlockInput } from 'types/EthosExecuteTransactionBlockInput';

type TransactArgs = {
  signer: HostedSigner | ExtensionSigner
  transactionInput: EthosExecuteTransactionBlockInput
}

const executeTransactionBlock = async ({
  signer,
  transactionInput
}: TransactArgs) => {
  console.log("transact", "Starting transaction", signer, transactionInput)
  return signer.executeTransactionBlock(transactionInput)
}

export default executeTransactionBlock
