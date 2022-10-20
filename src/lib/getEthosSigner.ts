import { SignableTransaction, SuiTransactionResponse } from '@mysten/sui.js'
import store from 'store2'
import { Chain } from '../enums/Chain'
import { Signer, SignerType } from '../types/Signer'
import activeUser from './activeUser'
import hostedInteraction, { HostedInteractionResponse } from './hostedInteraction'


const getEthosSigner = async (): Promise<Signer | null> => {

    const user: any = await activeUser()
    
    const getAccounts = async () => {
        if (!user) return [];
        return user.accounts.filter((account: any) => account.chain === Chain.Sui)
    }

    const getAddress = async () => {
        const accounts = await getAccounts();
        return accounts[0]?.address;
    }

    const signAndExecuteTransaction = (details: SignableTransaction): Promise<SuiTransactionResponse> => {
        return new Promise((resolve, reject) => {
            const transactionEventListener = ({ approved, data }: HostedInteractionResponse) => {
                if (approved) {
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

    const requestPreapproval = () => {
        return Promise.resolve(true);
    }

    const sign = () => {
        return Promise.resolve(true);
    }

    const disconnect = (wallet = false) => {
        return new Promise((resolve) => {
            const transactionEventListener = () => {
                resolve(true);
            }
        
            hostedInteraction({
                action: 'logout',
                data: { wallet },
                onResponse: transactionEventListener
            })

            store.namespace('auth')('access_token', null)
        });
    }

    return user ? {
        type: SignerType.ETHOS_HOSTED,
        email: user.email,
        getAccounts,
        getAddress,
        signAndExecuteTransaction,
        requestPreapproval,
        sign,
        disconnect
    } : null
   
}

export default getEthosSigner;