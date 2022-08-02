import { ethers, Contract as EthersContract } from 'ethers'
import getConfiguration from '../getConfiguration'
import apiCall from '../apiCall'
import showWallet from '../showWallet'
import transact from '../transact'
import { FunctionFragment } from 'ethers/lib/utils'
import { EthereumTransaction } from 'types/Transaction'

export class Contract {
  // Contract function properties
  readonly [key: string]: ethers.ContractFunction | any

  constructor(
    addressOrName: string,
    contractInterface: ethers.ContractInterface,
    signerOrProvider?: any
  ) {
    const ethersContract = new EthersContract(addressOrName, contractInterface, signerOrProvider)

    const base = new Object()

    return new Proxy(base, {
      get: (_target: any, contractFunctionName: string, receiver: any) => {
        const contractHasFunction = doesContractHaveFunction(
          contractInterface,
          contractFunctionName
        )
        if (signerOrProvider.ethos && contractHasFunction) {
          const { network } = getConfiguration()

          return (...inputValues: any[]) => {
            return new Promise<void>((resolve, _reject) => {
              const details: EthereumTransaction = {
                address: addressOrName,
                network: network || 'sui',
                abi: contractInterface,
                functionName: contractFunctionName,
                inputValues,
              }

              transact({
                signer: signerOrProvider,
                details,
                onSent: async (transaction: any) => {
                  const transactionWithWait = {
                    ...transaction,
                    wait: async () => {
                      const {
                        json: { receipt },
                      } = await apiCall({
                        relativePath: 'transaction/wait',
                        method: 'POST',
                        body: {
                          transactionHash: transaction.hash,
                          network,
                        },
                      })
                      return receipt
                    },
                  }
                  resolve(transactionWithWait)
                },
              })
              showWallet()
            })
          }
        }

        return Reflect.get(ethersContract, contractFunctionName, receiver)
      },
    })
  }
}

function doesContractHaveFunction(contractInterface: ethers.ContractInterface, prop: string) {
  return !!(contractInterface as FunctionFragment[]).find(
    (item: FunctionFragment) => item.name === prop
  )
}
