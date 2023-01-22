import { JsonRpcProvider, Network } from "@mysten/sui.js";
import { SuiNFT, WalletContents } from "../types/WalletContents";
import { newBN, sumBN } from '../lib/bigNumber';
import getBagNFT, { isBagNFT } from "./getBagNFT";
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
    existingContents?: WalletContents
}

const empty: WalletContents = {
    suiBalance: newBN(0),
    nfts: [],
    tokens: {},
    objects: []  
}

const getWalletContents = async ({ address, existingContents = empty }: GetWalletContentsArgs): Promise<WalletContents | null> => {
    const provider = new JsonRpcProvider(Network.DEVNET);

    if (!address) {
        return empty
    }
    
    const objectInfos = await provider.getObjectsOwnedByAddress(address);
    if (objectInfos.length === 0) {
        return empty;
    }

    const referenceAndData = (object: any) => {
      if (
        typeof object.details === "string" || 
        !("reference" in object.details)
      ) return {};

      return object.details;
    }

    const currentObjects = [];
    let newObjectInfos = [];
    if (existingContents?.objects && existingContents.objects.length > 0) {
        for (const objectInfo of objectInfos) {
            const existingObject = existingContents?.objects.find(
                (existingObject) => {
                    const { reference } = referenceAndData(existingObject);
                    return (
                        reference?.objectId === objectInfo.objectId &&
                        reference?.version === objectInfo.version
                    )
                }
            );
            
            if (existingObject) {
                currentObjects.push(existingObject);
            } else {
                newObjectInfos.push(objectInfo);
            }
        }
    } else {
        newObjectInfos = objectInfos;
    }

    if (newObjectInfos.length === 0) return null;

    const newObjectIds = newObjectInfos.map((o: any) => o.objectId);
    const newObjects = await provider.getObjectBatch(newObjectIds);
    const objects = currentObjects.concat(newObjects);

    let suiBalance = newBN(0);
    const nfts: SuiNFT[] = [];
    const tokens: {[key: string]: any}= {};
    for (const object of objects) {
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
                    package: '0x2',
                    type,
                    module: 'sui',
                    address: reference?.objectId,
                    objectId: reference?.objectId,
                    name: data.fields.name,
                    description: data.fields.description,
                    imageUri: safeUrl,
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
                    suiBalance = sumBN(suiBalance, data.fields.balance);
                }
                
                tokens[subtype] ||= {
                    balance: 0,
                    coins: []
                }
                
                tokens[subtype].balance = sumBN(tokens[subtype].balance, data.fields.balance);
                tokens[subtype].coins.push({
                    objectId: reference?.objectId,
                    type: data.type,
                    balance: data.fields.balance
                })
            } else if (isBagNFT(object)) {
                const bagNFT = await getBagNFT(provider, object);
                console.log("BAG NFT", bagNFT)
            } else {
                const { name, description, url, image_url, image, ...remaining } = data.fields || {}
                const safeUrl = ipfsConversion(url || image_url || image);
                if (safeUrl) {
                    nfts.push({
                        type: data?.type,
                        package: typeComponents[0],
                        chain: 'Sui',
                        address: reference?.objectId,
                        objectId: reference?.objectId,
                        name: name,
                        description: description,
                        imageUri: safeUrl,
                        extraFields: remaining,
                        module: typeComponents[1],
                        links: {
                            'DevNet Explorer': `https://explorer.devnet.sui.io/objects/${reference?.objectId}`
                        }
                    });    
                }
            }
        } catch (error) {
            console.log("Error retrieving object", object, error);
        }
    } 

    return { suiBalance, tokens, nfts, objects }
}

export default getWalletContents;