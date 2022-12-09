import { JsonRpcProvider, Network } from "@mysten/sui.js";
import { WalletContentContents } from "types/WalletContents";
// import fetchSui from "./fetchSui";

const ipfsConversion = (src: string): string => {
    if (!src) return "";
    if (src.indexOf('ipfs') === 0) {  
        src = `https://ipfs.io/ipfs/${src.substring(5)}`;
    }
    return src;
}

const empty: WalletContentContents = {
  contents: {
    suiBalance: 0,
    nfts: [],
    tokens: []
  },
  objectInfos: []     
}

const getWalletContents = async (address: string, objectInfos: any[] = []): Promise<WalletContentContents | null> => {
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

  if (!address) {
    return empty
  }
  
  const newObjectInfos = await provider.getObjectsOwnedByAddress(address);
  // const newObjectInfos: SuiObjectInfo[] = []
  
  if (newObjectInfos.length === 0) {
    return empty;
  }

  const objectIds = newObjectInfos.filter(
    (newObjectInfo) => !objectInfos.find(
      (objectInfo) => (
        newObjectInfo.objectId === objectInfo.objectId &&
        newObjectInfo.version === objectInfo.version
      )
    )
  ).map((o: any) => o.objectId);

  if (objectIds.length === 0) return null;

  const objects = await provider.getObjectBatch(objectIds)

//   console.log("OBJECTS", objects)
  
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

  return { contents: { suiBalance, tokens, nfts }, objectInfos: newObjectInfos }
}

export default getWalletContents;