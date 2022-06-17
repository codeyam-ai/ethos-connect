import { TransactionRequest, Provider } from '@ethersproject/abstract-provider';
import { Bytes, Signer as EthersSigner } from 'ethers';
import { Deferrable } from 'ethers/lib/utils';

export class Signer extends EthersSigner {
    getAddress(): Promise<string> {
        return Promise.resolve('THIS IS AN ADDRESS');
    }
    signMessage(message: string | Bytes): Promise<string> {
        throw new Error('Method not implemented.');
    }
    signTransaction(transaction: Deferrable<TransactionRequest>): Promise<string> {
        throw new Error('Method not implemented.');
    }
    connect(provider: Provider): Signer {
        throw new Error('Method not implemented.');
    }

}