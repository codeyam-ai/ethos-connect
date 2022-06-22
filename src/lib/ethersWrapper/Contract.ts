import { ethers, Contract as EthersContract } from "ethers";
import showWallet from "../showWallet";
import transact from "../transact";
// import { CustomBaseContract } from "./CustomBaseContract";
import { Signer } from "./Signer";

export class Contract {
  // The meta-class properties
  readonly [key: string]: ethers.ContractFunction | any;

  constructor(addressOrName: string, contractInterface: ethers.ContractInterface, signerOrProvider?: Signer | any) {
    const ethersContract = new EthersContract(
      addressOrName,
      contractInterface, 
      signerOrProvider
    )  

    const base = new Object();
    
    return new Proxy(base, {
      get: (_target: any, prop: any, receiver: any) => {
        const abiCall = (contractInterface as any[]).find(
          (item: any) => item.name === prop
        )
        if (signerOrProvider.ethos && abiCall) {
          const { appId, network } = signerOrProvider.ethos;
          
          return (...inputValues: any[]) => {
            return new Promise<void>((resolve, _reject) => {
              showWallet(appId);

              transact({
                appId: appId,
                network: network,
                abi: contractInterface,
                address: addressOrName,
                unpopulatedTransaction: {
                  functionName: prop,
                  inputValues,
                },
                onComplete: async () => {
                  resolve();
                }
              })
            })
          };
        }

        return Reflect.get(ethersContract, prop, receiver);
      }
    })
  }
}
