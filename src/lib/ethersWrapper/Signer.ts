import { TransactionRequest, Provider } from '@ethersproject/abstract-provider';
import { Bytes, Signer as EthersSigner } from 'ethers';
import { Deferrable } from 'ethers/lib/utils';

export class Signer extends EthersSigner {
  getAddress(): Promise<string> {
      return Promise.resolve('THIS IS AN ADDRESS');
  }
  signMessage(_message: string | Bytes): Promise<string> {
      throw new Error('Method not implemented.');
  }
  signTransaction(_transaction: Deferrable<TransactionRequest>): Promise<string> {
      throw new Error('Method not implemented.');
  }
  connect(_provider: Provider): Signer {
      throw new Error('Method not implemented.');
  }
}