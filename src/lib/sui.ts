import * as sui from '@mysten/sui.js';

const providerCall = ( method: string, args: any[] ) => {
  const provider = new sui.JsonRpcProvider("https://gateway.devnet.sui.io:443/") as any;
  return provider[method](...args)
}

export default {
  ...sui,
  getObject: (...args: any[]) => providerCall("getObject", args)
};