import { SignableTransaction } from '@mysten/sui.js'
import { Chain } from 'enums/Chain'
import { SignerType } from 'types/Signer'
import activeUser from './activeUser'
import hostedInteraction, { HostedInteractionResponse } from './hostedInteraction'


const getEthosSigner = async (): Promise<any> => {

  const user: any = await activeUser()

  const getAccounts = async () => {
    return user.accounts.filter((account: any) => account.chain === Chain.Sui)
  }

  const getAddress = async () => {
    const accounts = await getAccounts();
    return accounts[0];
  }

  const signAndExecuteTransaction = (details: SignableTransaction) => {
    return new Promise((resolve, reject) => {
      const transactionEventListener = ({ state, data }: HostedInteractionResponse) => {
        if (state.approved) {
          resolve(data);
        } else {
          reject({ error: "User rejected transaction."})
        }
      }
  
      hostedInteraction({
        action: 'transact',
        data: { details },
        onResponse: transactionEventListener
      })
    });
  }

  return {
    type: SignerType.ETHOS_HOSTED,
    getAccounts,
    getAddress,
    signAndExecuteTransaction 
    
  }
   
}

export default getEthosSigner
