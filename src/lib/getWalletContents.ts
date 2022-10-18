import fetchSui from "./fetchSui";

export type WalletContents = {
  suiBalance: number,
  tokens: {[key: string]: any},
  nfts: any[]
}

const getWalletContents = async (address: string): Promise<WalletContents> => {
  let objectInfos: any[] = [];

  if (address) {
    try {
      const response = await fetchSui(
        'sui_getObjectsOwnedByAddress',
        [ address ]
      )
  
      if (response.error) {
        console.log("Error getting wallet contenst", response.error);
      } else {
        objectInfos = response;
      }
      // objectInfos = await provider.getObjectsOwnedByAddress(address);
    } catch (e) {
      console.log("Error getting Sui objects owned by adddress", e);
    }
  }

  if (objectInfos.length === 0) {
    return {
        suiBalance: 0,
        tokens: [],
        nfts: []
    }
  }

  const objectIds = objectInfos.map((o: any) => o.objectId);
  // const objects = await provider.getObjectBatch(objectIds)
  const objects = [];
  for (const objectId of objectIds) {
    const object = await fetchSui(
      'sui_getObject', 
      [
        objectId
      ] 
    );
    objects.push(object);
  }
 
  let suiBalance = 0;
  const nfts = [];
  const tokens: {[key: string]: any}= {};
  // const modules = {};
  for (const object of objects) {
    try {
      const { data, reference } = object.details as any || {}

      if (!data) continue;
      
      const typeComponents = (data?.type || "").split('::');
      console.log("TYPE COMPONENTS", typeComponents)
      const type = typeComponents[2];

      if (type === 'DevNetNFT') {
        let { url } = data.fields;
        if (url.indexOf('ipfs') === 0) {  
          url = `https://ipfs.io/ipfs/${url.substring(5)}`;
        }
        nfts.push({
          chain: 'Sui',
          address: reference?.objectId,
          name: data.fields.name,
          description: data.fields.description,
          imageUri: url,
          previewUri: url,
          thumbnailUri: url,
          collection: {
            name: "DevNetNFT",
            type: data?.type
          },
          links: {
            'DevNet Explorer': `https://explorer.devnet.sui.io/objects/${reference?.objectId}`
          }
        });
      } else if (type === 'SUI') {
        suiBalance += data.fields.balance
        tokens[type].balance += data.fields.balance
        tokens[type].coins.push({
          objectId: reference?.objectId,
          type: data.type,
          balance: data.fields.balance
        })
      } else {
        const { name, description, url, image_url, image, ...remaining } = data.fields || {}
        nfts.push({
          type: data?.type,
          package: typeComponents[0],
          chain: 'Sui',
          address: reference?.objectId,
          name: name,
          description: description,
          imageUri: url || image_url || image,
          previewUri: url || image_url || image,
          thumbnailUri: url || image_url || image,
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