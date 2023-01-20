import get from 'lodash/get';
import { JsonRpcProvider, Network } from '@mysten/sui.js';

const PACKAGE_ADDRESS = '0xc0ce82cb6210799e42d4a26bc7b6f5cebca0a010';
const REGISTRY_ADDRESS = '0x3ffb7841348e62000081a2c98a2455eb4eb346f3';
const SENDER = '0xd4c4c0f3c6eae1bec838442a49bacc358fdc3c5b';
const DEV_INSPECT_RESULT_PATH_0 = 'results.Ok[0][1].returnValues[0][0]';
const DEV_INSPECT_RESULT_PATH_1 = 'results.Ok[0][1].returnValues[1][0]';

const suiProvider = new JsonRpcProvider(Network.DEVNET);

const toHexString = (byteArray: Uint8Array) =>
  byteArray?.length > 0 ? Array.from(byteArray, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('') : '';

const toString = (byteArray: Uint8Array) =>
  byteArray?.length > 0 ? new TextDecoder().decode(Buffer.from(byteArray.slice(1)).buffer) : '';

const trimAddress = (address: string) => String(address?.match(/0x0{0,}([\w\d]+)/)?.[1]);

const toFullAddress = (trimmedAddress: string) => (trimmedAddress ? `0x${trimmedAddress.padStart(40, '0')}` : '');

export const getSuiName = async (address: string, sender: string = SENDER) => {
  try {
    const resolverBytes = get(
      await suiProvider.devInspectMoveCall(sender, {
        packageObjectId: PACKAGE_ADDRESS,
        module: 'base_registry',
        function: 'get_record_by_key',
        typeArguments: [],
        arguments: [REGISTRY_ADDRESS, `${trimAddress(address)}.addr.reverse`],
      }),
      DEV_INSPECT_RESULT_PATH_1,
    );
    if (!resolverBytes) return address;

    const resolver = toFullAddress(toHexString(resolverBytes));
    const resolverResponse = await suiProvider.devInspectMoveCall(sender, {
      packageObjectId: PACKAGE_ADDRESS,
      module: 'resolver',
      function: 'name',
      typeArguments: [],
      arguments: [resolver, address],
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

export const getSuiAddress = async (domain: string, sender: string = SENDER) => {
  try {
    const resolverResponse = await suiProvider.devInspectMoveCall(sender, {
        packageObjectId: PACKAGE_ADDRESS,
        module: 'base_registry',
        function: 'get_record_by_key',
        typeArguments: [],
        arguments: [REGISTRY_ADDRESS, domain],
      });

    const resolverBytes = get(resolverResponse, DEV_INSPECT_RESULT_PATH_1);
    if (!resolverBytes) return domain;

    const resolver = toFullAddress(toHexString(resolverBytes));
    const resolverResponse2 = await suiProvider.devInspectMoveCall(sender, {
        packageObjectId: PACKAGE_ADDRESS,
        module: 'resolver',
        function: 'addr',
        typeArguments: [],
        arguments: [resolver, domain],
    })
    const addr = get(resolverResponse2, DEV_INSPECT_RESULT_PATH_0)

    if (!addr) return domain;

    return toFullAddress(toHexString(addr));
  } catch (e) {
    console.log("Error retrieving address from SuiNS name", e);
    return domain;
  }
};