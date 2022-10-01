import fetchSui from "./fetchSui";

const getWalletContents = async ({ address }: { address: string }) => {
  let objectInfos = [];
  try {
    objectInfos = await fetchSui(
      'sui_getObjectsOwnedByAddress',
      [ address ]
    )
    // objectInfos = await provider.getObjectsOwnedByAddress(address);
  } catch (e) {
    console.log("Error getting Sui objects owned by adddress", e);
  }

  if (objectInfos.length === 0) {
    return {
      balance: 0,
      coins: [],
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
 
  const nfts = [];
  const coins = [];
  // const modules = {};
  for (const object of objects) {
    try {
      const { data, reference } = object.details as any || {}

      if (!data) continue;
      
      if (data?.type === '0x2::devnet_nft::DevNetNFT') {
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
      } else if (data?.type?.startsWith('0x2::coin::Coin')) {
        coins.push({
          address: reference?.objectId,
          type: data.type,
          balance: data.fields.balance
        })
      } else {
        // console.dir(data, { depth: null })
        const objectParts = data?.type.split('::')
        // if (!modules[objectParts[0]]) {
        //   const mod = await fetchSui('sui_getNormalizedMoveModule', [objectParts[0], objectParts[1]], process.env.SHINAMI_GATEWAY)
        //   modules[objectParts[0]] = mod
        // }
        
        const { name, description, url, image_url, image, ...remaining } = data.fields || {}
        // console.log("NEW", data.fields)
        nfts.push({
          type: data?.type,
          package: objectParts[0],
          chain: 'Sui',
          address: reference?.objectId,
          name: name,
          description: description,
          imageUri: url || image_url || image,
          previewUri: url || image_url || image,
          thumbnailUri: url || image_url || image,
          extraFields: remaining,
          module: objectParts[1],
          links: {
            'DevNet Explorer': `https://explorer.devnet.sui.io/objects/${reference?.objectId}`
          }
        });
      }
    } catch (error) {
      console.log("Error retrieving object", object, error);
    }
  } 

  const balance = coins.filter(
    (coin) => coin.type === '0x2::coin::Coin<0x2::sui::SUI>'
  ).reduce(
    (total, coin) => total + parseFloat(coin.balance), 
    0
  );
  return { balance, coins, nfts }
}

export default getWalletContents;