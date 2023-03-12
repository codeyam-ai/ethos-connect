import { Connection, JsonRpcProvider } from "@mysten/sui.js";
import { SuiNFT, WalletContents } from "../types/WalletContents";
import { newBN, sumBN } from './bigNumber';
import getBagNFT, { isBagNFT } from "./getBagNFT";
// import fetchSui from "./fetchSui";
import { ConvenenienceSuiObject } from '../types/ConvenienceSuiObject';
import { DEFAULT_NETWORK } from './constants';

export const ipfsConversion = (src?: string): string => {
    if (!src) return "";
    if (src.indexOf('ipfs') === 0) {  
        src = `https://ipfs.io/ipfs/${src.substring(5)}`;
    }
    return src;
}

export type GetWalletContentsArgs = {
    address: string,
    network: string,
    existingContents?: WalletContents
}

const empty: WalletContents = {
    suiBalance: newBN(0),
    nfts: [],
    tokens: {},
    objects: []  
}

const getWalletContents = async ({ address, network, existingContents = empty }: GetWalletContentsArgs): Promise<WalletContents | null> => {
    const connection = new Connection({ fullnode: network || DEFAULT_NETWORK })
    const provider = new JsonRpcProvider(connection);

    if (!address) {
        return empty
    }
    
    const objectInfos = await provider.getObjectsOwnedByAddress(address);
    if (objectInfos.length === 0) {
        return empty;
    }

    const currentObjects = [];
    let newObjectInfos = [];
    if (existingContents?.objects && existingContents.objects.length > 0) {
        for (const objectInfo of objectInfos) {
            const existingObject = existingContents?.objects.find(
                (existingObject) => {
                    return (
                        existingObject.objectId === objectInfo.objectId &&
                        existingObject.version === objectInfo.version
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
    const newObjects = await provider.getObjectBatch(newObjectIds, {
        showContent: true,
        showType: true,
        showOwner: true,
        showDisplay: true
    });
    const objects = currentObjects.concat(newObjects);

    let suiBalance = newBN(0);
    const nfts: SuiNFT[] = [];
    const tokens: {[key: string]: any}= {};
    const convenenienceObjects: ConvenenienceSuiObject[] = [];
    for (const object of objects) {
        const { details } = object
        const { content: { fields } } = details;
        try {
            const typeStringComponents = (details.type || "").split('<');
            const subtype = (typeStringComponents[1] || "").replace(/>/, '')
            const typeComponents = typeStringComponents[0].split('::');
            const type = typeComponents[typeComponents.length - 1];

            const { name, description, ...extraFields } = fields || {}
            convenenienceObjects.push({
                ...object,
                type: object?.type,
                objectId: object?.objectId,
                name,
                description,
                extraFields
            })

            if (type === 'DevNetNFT') {
                let { url } = fields;
                let safeUrl = ipfsConversion(url)
                nfts.push({
                    chain: 'Sui',
                    package: '0x2',
                    type,
                    module: 'sui',
                    address: object?.objectId,
                    objectId: object?.objectId,
                    name: fields.name,
                    description: fields.description,
                    imageUri: safeUrl,
                    collection: {
                        name: "DevNetNFT",
                        type: object?.type
                    },
                    links: {
                        'DevNet Explorer': `https://explorer.devnet.sui.io/objects/${object?.objectId}`
                    }
                });
            } else if (type === 'Coin') {
                if (subtype === '0x2::sui::SUI') {
                    suiBalance = sumBN(suiBalance, fields.balance);
                }
                
                tokens[subtype] ||= {
                    balance: 0,
                    coins: []
                }
                
                tokens[subtype].balance = sumBN(tokens[subtype].balance, fields.balance);
                tokens[subtype].coins.push({
                    objectId: object?.objectId,
                    type: object.type,
                    balance: newBN(fields.balance)
                })
            } else if (isBagNFT(object.details)) {
                const bagNFT = await getBagNFT(provider, object.details);
                
                if ("name" in bagNFT) {
                    nfts.push({
                        type: object?.type,
                        package: typeComponents[0],
                        chain: 'Sui',
                        address: object?.objectId,
                        objectId: object?.objectId,
                        name: bagNFT.name,
                        description: bagNFT.description,
                        imageUri: ipfsConversion(bagNFT.url),
                        module: typeComponents[1],
                        links: {
                            'Explorer': `https://explorer.sui.io/objects/${object?.objectId}`
                        }
                    });       
                }
            } else {
                const { url, image_url, image, ...remaining } = extraFields || {}
                const safeUrl = ipfsConversion(url || image_url || image);
                if (safeUrl) {
                    nfts.push({
                        type: object?.type,
                        package: typeComponents[0],
                        chain: 'Sui',
                        address: object?.objectId,
                        objectId: object?.objectId,
                        name: name,
                        description: description,
                        imageUri: safeUrl,
                        extraFields: remaining,
                        module: typeComponents[1],
                        links: {
                            'Explorer': `https://explorer.sui.io/objects/${object?.objectId}`
                        }
                    });    
                }
            }
        } catch (error) {
            console.log("Error retrieving object", object, error);
        }
    } 

    return { suiBalance, tokens, nfts, objects: convenenienceObjects }
}

export default getWalletContents;