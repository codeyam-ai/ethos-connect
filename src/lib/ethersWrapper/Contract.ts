import { ethers, Contract as EthersContract } from 'ethers'
import getConfiguration from '../getConfiguration'
import apiCall from '../apiCall'
import showWallet from '../showWallet'
import transact from '../transact'
// import { CustomBaseContract } from "./CustomBaseContract";

export class Contract {
  // The meta-class properties
  readonly [key: string]: ethers.ContractFunction | any

  constructor(
    addressOrName: string,
    contractInterface: ethers.ContractInterface,
    signerOrProvider?: any
  ) {
    const ethersContract = new EthersContract(addressOrName, contractInterface, signerOrProvider)

    const base = new Object()

    return new Proxy(base, {
      get: (_target: any, prop: any, receiver: any) => {
        const abiCall = (contractInterface as any[]).find((item: any) => item.name === prop)
        if (signerOrProvider.ethos && abiCall) {
          const { appId, network } = getConfiguration()

          return (...inputValues: any[]) => {
            return new Promise<void>((resolve, _reject) => {
              transact({
                appId: appId,
                network: network,
                abi: contractInterface,
                address: addressOrName,
                unpopulatedTransaction: {
                  functionName: prop,
                  inputValues,
                },
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
              showWallet(appId)
            })
          }
        }

        return Reflect.get(ethersContract, prop, receiver)
      },
    })
  }
}
