import { Connection, JsonRpcProvider } from '@mysten/sui.js';
import { DEFAULT_NETWORK } from './constants';

export const getSuiName = async (address: string, network?: string) => {
  const connection = new Connection({ fullnode: network ?? DEFAULT_NETWORK })
  const suiProvider = new JsonRpcProvider(connection);

  // const x = await suiProvider.resolveNameServiceNames({ address: '0x22e544fc7bfe271395ac7955c21d7db62734bcadabfee17c0c2ec9359172d90c' });
  // console.log('x', x, address, connection.fullnode);
  // const z = await suiProvider.resolveNameServiceAddress({ name: 'irrational.sui' });
  // console.log('z', z);

  return suiProvider.resolveNameServiceNames({ address });
};

export const getSuiAddress = async (name: string, network?: string) => {
  const connection = new Connection({ fullnode: network ?? DEFAULT_NETWORK })
  const suiProvider = new JsonRpcProvider(connection);

  return suiProvider.resolveNameServiceAddress({ name });
};