import { JsonRpcProvider, Network } from "@mysten/sui.js";
// import fetchSui from "./fetchSui";

export type WalletContents = {
  suiBalance: number,
  tokens: {[key: string]: any},
  nfts: any[]
}

const ipfsConversion = (src: string): string => {
    if (!src) return "";
    if (src.indexOf('ipfs') === 0) {  
        src = `https://ipfs.io/ipfs/${src.substring(5)}`;
    }
    return src;
}

const getWalletContents = async (address: string): Promise<WalletContents> => {
  const provider = new JsonRpcProvider(Network.DEVNET);
//   let objectInfos: any[] = [];

//   if (address) {
//     try {
//       const response = await fetchSui(
//         'sui_getObjectsOwnedByAddress',
//         [ address ]
//       )
  
//       if (response.error) {
//         console.log("Error getting wallet contenst", response.error);
//       } else {
//         objectInfos = response;
//       }
//       // objectInfos = await provider.getObjectsOwnedByAddress(address);
//     } catch (e) {
//       console.log("Error getting Sui objects owned by adddress", e);
//     }
//   }
  const objectInfos = await provider.getObjectsOwnedByAddress(address);
  
  if (objectInfos.length === 0) {
    return {
        suiBalance: 0,
        tokens: [],
        nfts: []
    }
  }

  const objectIds = objectInfos.map((o: any) => o.objectId);
  const objects = await provider.getObjectBatch(objectIds)
  
//   const objects = [];
//   for (const objectId of objectIds) {
//     const object = await fetchSui(
//       'sui_getObject', 
//       [
//         objectId
//       ] 
//     );
//     objects.push(object);
//   }
 
  let suiBalance = 0;
  const nfts = [];
  const tokens: {[key: string]: any}= {};
  // const modules = {};
  for (const object of objects) {
    try {
      const { data, reference } = object.details as any || {}

      if (!data) continue;
      
      const typeStringComponents = (data?.type || "").split('<');
      const subtype = (typeStringComponents[1] || "").replace(/>/, '')
      const typeComponents = typeStringComponents[0].split('::');
      const type = typeComponents[typeComponents.length - 1];

      if (type === 'DevNetNFT') {
        let { url } = data.fields;
        let safeUrl = ipfsConversion(url)
        nfts.push({
          chain: 'Sui',
          address: reference?.objectId,
          name: data.fields.name,
          description: data.fields.description,
          imageUri: safeUrl,
          previewUri: safeUrl,
          thumbnailUri: safeUrl,
          collection: {
            name: "DevNetNFT",
            type: data?.type
          },
          links: {
            'DevNet Explorer': `https://explorer.devnet.sui.io/objects/${reference?.objectId}`
          }
        });
      } else if (type === 'Coin') {
        if (subtype === '0x2::sui::SUI') {
            suiBalance += data.fields.balance
        }
        
        tokens[subtype] ||= {
            balance: 0,
            coins: []
        }
        
        tokens[subtype].balance += data.fields.balance
        tokens[subtype].coins.push({
          objectId: reference?.objectId,
          type: data.type,
          balance: data.fields.balance
        })
      } else {
        const { name, description, url, image_url, image, ...remaining } = data.fields || {}
        const safeUrl = ipfsConversion(url || image_url || image);
        nfts.push({
          type: data?.type,
          package: typeComponents[0],
          chain: 'Sui',
          address: reference?.objectId,
          name: name,
          description: description,
          imageUri: safeUrl,
          previewUri: safeUrl,
          thumbnailUri: safeUrl,
          extraFields: remaining,
          module: typeComponents[1],
          links: {
            'DevNet Explorer': `https://explorer.devnet.sui.io/objects/${reference?.objectId}`
          }
        });
      }
    } catch (error) {
      console.log("Error retrieving object", object, error);
    }
  } 

  return { suiBalance, tokens, nfts }
}

export default getWalletContents;