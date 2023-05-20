import get from 'lodash-es/get';
import { Connection, JsonRpcProvider, TransactionBlock } from '@mysten/sui.js';
import { DEFAULT_NETWORK } from './constants';

const PACKAGE_ADDRESS = '0xe7ed73e4c2c1b38729155bf5c44dc4496a9edd2f';
const REGISTRY_ADDRESS = '0xa378adb13792599e8eb8c7e4f2e938863921e4f4';
const SENDER = '0x0000000000000000000000000000000000000002';
const DEV_INSPECT_RESULT_PATH_0 = 'results.Ok[0][1].returnValues[0][0]';
const DEV_INSPECT_RESULT_PATH_1 = 'results.Ok[0][1].returnValues[1][0]';

const toHexString = (byteArray: Uint8Array) =>
  byteArray?.length > 0 ? Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('') : '';

const toString = (byteArray: Uint8Array) =>
  byteArray?.length > 0 ? new TextDecoder().decode((byteArray.slice(1)).buffer) : '';

const trimAddress = (address: string) => String(address?.match(/0x0{0,}([\w\d]+)/)?.[1]);

const toFullAddress = (trimmedAddress: string) => (trimmedAddress ? `0x${trimmedAddress.padStart(40, '0')}` : '');

export const getSuiName = async (address: string, network: string, sender: string = SENDER) => {
  const connection = new Connection({ fullnode: network || DEFAULT_NETWORK })
  const suiProvider = new JsonRpcProvider(connection);

  try {
    const registryTx = new TransactionBlock();
    registryTx.add(
      TransactionBlock.Transactions.MoveCall({
        target: `${PACKAGE_ADDRESS}::base_registry::get_record_by_key`,
        arguments: [
          registryTx.object(REGISTRY_ADDRESS), 
          registryTx.pure(`${trimAddress(address)}.addr.reverse`)
        ],
      })
    )
    const resolverBytes = get(
      await suiProvider.devInspectTransactionBlock({
        transactionBlock: registryTx,
        sender
      }),
      DEV_INSPECT_RESULT_PATH_1,
    );
    if (!resolverBytes) return address;

    const resolver = toFullAddress(toHexString(resolverBytes));
    const resolverTx = new TransactionBlock();
    resolverTx.add(
      TransactionBlock.Transactions.MoveCall({
        target: `${PACKAGE_ADDRESS}::resolver::name`,
        arguments: [
          registryTx.object(resolver), 
          registryTx.pure(address)
        ],
      })
    )
    const resolverResponse = await suiProvider.devInspectTransactionBlock({
      transactionBlock: resolverTx,
      sender
    })
  
    const nameByteArray = get(resolverResponse, DEV_INSPECT_RESULT_PATH_0);
    if (!nameByteArray) return address;

    const name = toString(nameByteArray);
    return name;
  } catch (e) {
    console.log("Error retreiving SuiNS Name", e);
    return address;
  }
};

export const getSuiAddress = async (domain: string, network: string, sender: string = SENDER) => {
  const connection = new Connection({ fullnode: network || DEFAULT_NETWORK })
  const suiProvider = new JsonRpcProvider(connection);

  try {
    const registryTx = new TransactionBlock();
    registryTx.add(
      TransactionBlock.Transactions.MoveCall({
        target: `${PACKAGE_ADDRESS}::base_registry::get_record_by_key`,
        arguments: [
          registryTx.object(REGISTRY_ADDRESS), 
          registryTx.pure(domain)
        ],
      })
    )
    const resolverResponse = await suiProvider.devInspectTransactionBlock({
      transactionBlock: registryTx,
      sender
    });

    const resolverBytes = get(resolverResponse, DEV_INSPECT_RESULT_PATH_1);
    if (!resolverBytes) return domain;

    const resolver = toFullAddress(toHexString(resolverBytes));
    const resolverTx = new TransactionBlock();
    resolverTx.add(
      TransactionBlock.Transactions.MoveCall({
        target: `${PACKAGE_ADDRESS}::resolver::addr`,
        arguments: [
          registryTx.object(resolver), 
          registryTx.pure(domain)
        ],
      })
    )
    const resolverResponse2 = await suiProvider.devInspectTransactionBlock({
      transactionBlock: resolverTx,
      sender, 
    })
    const addr = get(resolverResponse2, DEV_INSPECT_RESULT_PATH_0)

    if (!addr) return domain;

    return toFullAddress(toHexString(addr));
  } catch (e) {
    console.log("Error retrieving address from SuiNS name", e);
    return domain;
  }
};