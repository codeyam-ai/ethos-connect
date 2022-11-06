import { SignableTransaction, SuiTransactionResponse } from '@mysten/sui.js'
import store from 'store2'
import { Chain } from '../enums/Chain'
import { HostedSigner, SignerType } from '../types/Signer'
import activeUser from './activeUser'
import hostedInteraction, { HostedInteractionResponse } from './hostedInteraction'


const getEthosSigner = async (): Promise<HostedSigner | null> => {

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
                    resolve(data.response);
                } else {
                    reject({ error: data?.response?.error || "User rejected transaction."})
                }
            }
            
            hostedInteraction({
                action: 'transaction',
                data: { details },
                onResponse: transactionEventListener,
                showWallet: true
            })
        });
    }

    const requestPreapproval = () => {
        return Promise.resolve(true);
    }

    const sign = (message: string | Uint8Array): Promise<any> => {
        return new Promise((resolve, reject) => {
            const transactionEventListener = ({ approved, data }: HostedInteractionResponse) => {
                if (approved) {
                    resolve(data.response);
                } else {
                    reject({ error: data?.response?.error || "User rejected signing."})
                }
            }
            
            hostedInteraction({
                action: 'sign',
                data: { signData: message },
                onResponse: transactionEventListener,
                showWallet: true
            })
        });
    }

    const disconnect = (fromWallet = false) => {
        return new Promise((resolve) => {
            const transactionEventListener = () => {
                resolve(true);
            }
        
            hostedInteraction({
                action: 'logout',
                data: { fromWallet },
                onResponse: transactionEventListener
            })

            store.namespace('auth')('access_token', null)
        });
    }

    const logout = () => {
        disconnect(true);
    }

    return user ? {
        type: SignerType.HOSTED,
        email: user.email,
        getAccounts,
        getAddress,
        signAndExecuteTransaction,
        requestPreapproval,
        sign,
        disconnect,
        logout
    } : null
   
}

export default getEthosSigner;