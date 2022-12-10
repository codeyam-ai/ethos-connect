import { JsonRpcProvider, Network } from "@mysten/sui.js";
import { WalletContents } from "../types/WalletContents";
// import fetchSui from "./fetchSui";

const ipfsConversion = (src: string): string => {
    if (!src) return "";
    if (src.indexOf('ipfs') === 0) {  
        src = `https://ipfs.io/ipfs/${src.substring(5)}`;
    }
    return src;
}

export type GetWalletContentsArgs = {
    address: string,
    raw?: boolean,
    existingContents?: WalletContents | any[]
}

const empty: WalletContents = {
    suiBalance: 0,
    nfts: [],
    tokens: [],
    objects: []  
}

const getWalletContents = async ({ address, raw = false, existingContents = empty }: GetWalletContentsArgs): Promise<WalletContents | any[] | null> => {
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
    return raw ? [] : empty
  }
  
  const objectInfos = await provider.getObjectsOwnedByAddress(address);
  // const newObjectInfos: SuiObjectInfo[] = []
  
  if (objectInfos.length === 0) {
    return raw ? [] : empty;
  }

  const referenceAndData = (object: any) => {
    if (
      typeof object.details === "string" || 
      !("reference" in object.details)
    ) return {};

    return object.details;
  }

  const allRawObjects = Array.isArray(existingContents) ? existingContents : existingContents.objects
  const rawObjects = allRawObjects.length === 0 ? allRawObjects : allRawObjects.filter(
    (object: any) => {
      const { reference } = referenceAndData(object);
      return !!objectInfos.find(
        (info) => {
          return info.objectId === reference?.objectId
        }
      )
    }
  );
  
  const objectIds = objectInfos.filter(
    (objectInfo) => !rawObjects.find(
      (object: any) => {
        const { reference } = referenceAndData(object);
        return (
          reference?.objectId === objectInfo.objectId &&
          reference?.version === objectInfo.version
        )
      }
    )
  ).map((o: any) => o.objectId);

  if (objectIds.length === 0) return null;

  const objects = await provider.getObjectBatch(objectIds)

  for (const object of objects) {
    const { reference } = referenceAndData(object);
    if (!reference) continue;

    const index = rawObjects.findIndex(
      (o) => {
        const { reference: r } = referenceAndData(o);
        if (!r) return false;
        return r.objectId === reference.objectId
      }
    );
    console.log("index", index, rawObjects.length, rawObjects[index])
    if (index === -1) {
      rawObjects.push(object);
    } else {
      rawObjects.splice(index, 1, object);
    }
    console.log("after", rawObjects.length, rawObjects[index])
  }

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
  for (const object of rawObjects) {
    try {
      const { reference, data } = referenceAndData(object);
      if (!reference) continue;  
      
      const typeStringComponents = (data.type || "").split('<');
      const subtype = (typeStringComponents[1] || "").replace(/>/, '')
      const typeComponents = typeStringComponents[0].split('::');
      const type = typeComponents[typeComponents.length - 1];

      if (type === 'DevNetNFT') {
        let { url } = data.fields;
        let safeUrl = ipfsConversion(url)
        nfts.push({
          chain: 'Sui',
          address: reference?.objectId,
          objectId: reference?.objectId,
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
          objectId: reference?.objectId,
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

  return { suiBalance, tokens, nfts, objects: rawObjects }
}

export default getWalletContents;