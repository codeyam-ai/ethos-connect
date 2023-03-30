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
    
    const objectInfos = await provider.getOwnedObjects({
        owner: address
    });

    if (objectInfos.data.length === 0) {
        return empty;
    }

    const currentObjects = [];
    let newObjectInfos = [];
    if (existingContents?.objects && existingContents.objects.length > 0) {
        for (const objectInfo of objectInfos.data) {
            const existingObject = existingContents?.objects.find(
                (existingObject) => {
                    if (
                        typeof objectInfo.data === "object" &&
                        typeof existingObject.data === "object"
                    ) {
                        return (
                            existingObject.data.objectId === objectInfo.data.objectId &&
                            existingObject.data.version === objectInfo.data.version
                        )    
                    } else {
                        return false;
                    }
                }
            );
            
            if (existingObject) {
                currentObjects.push(existingObject);
            } else {
                newObjectInfos.push(objectInfo);
            }
        }
    } else {
        newObjectInfos = objectInfos.data;
    }

    if (newObjectInfos.length === 0) return null;

    const newObjectIds = newObjectInfos.map((o) => {
        if (typeof o.data === "object") {
            return o.data.objectId
        } else {
            return ""
        }
    }).filter((objectId) => objectId.length > 0);
    
    const newObjects = await provider.multiGetObjects({
        ids: newObjectIds, 
        options: {
            showContent: true,
            showType: true,
            showOwner: true,
            showDisplay: true
        }
    });
    const objects = currentObjects.concat(newObjects);

    let suiBalance = newBN(0);
    const nfts: SuiNFT[] = [];
    const tokens: {[key: string]: any}= {};
    const convenenienceObjects: ConvenenienceSuiObject[] = [];
    for (const object of objects) {
        const { data } = object
        const { display, content: { fields } } = data;
        try {
            const typeStringComponents = (data.type || "").split('<');
            const subtype = (typeStringComponents[1] || "").replace(/>/, '')
            const typeComponents = typeStringComponents[0].split('::');
            const type = typeComponents[typeComponents.length - 1];

            const { name, description, ...extraFields } = fields || {}
            
            convenenienceObjects.push({
                ...object,
                type: data?.type,
                version: data?.version,
                objectId: data?.objectId,
                name,
                description,
                display,
                extraFields
            })

            if (type === 'Coin') {
                if (subtype === '0x2::sui::SUI') {
                    suiBalance = sumBN(suiBalance, fields.balance);
                }
                
                tokens[subtype] ||= {
                    balance: 0,
                    coins: []
                }
                
                tokens[subtype].balance = sumBN(tokens[subtype].balance, fields.balance);
                tokens[subtype].coins.push({
                    objectId: data?.objectId,
                    type: data?.type,
                    balance: newBN(fields.balance),
                    digest: data?.digest,
                    version: data?.version,
                    display
                })
            } else if (isBagNFT(object.data)) {
                const bagNFT = await getBagNFT(provider, object.data);
                
                if ("name" in bagNFT) {
                    nfts.push({
                        type: data?.type,
                        package: typeComponents[0],
                        chain: 'Sui',
                        address: data?.objectId,
                        objectId: data?.objectId,
                        name: display?.name ?? bagNFT.name,
                        description: display?.name ?? bagNFT.description,
                        imageUri: ipfsConversion(display?.img_url ?? bagNFT.url),
                        link: display?.link,
                        creator: display?.creator,
                        projectUrl: display?.project_url,
                        display,
                        module: typeComponents[1],
                        links: {
                            'Explorer': `https://explorer.sui.io/objects/${object?.objectId}`
                        }
                    });       
                }
            } else {
                const { url, image_url, image, ...remaining } = extraFields || {}
                const safeUrl = ipfsConversion(display?.img_url || url || image_url || image);
                if (safeUrl) {
                    nfts.push({
                        type: data?.type,
                        package: typeComponents[0],
                        chain: 'Sui',
                        address: data?.objectId,
                        objectId: data?.objectId,
                        name: display?.name ?? name,
                        description: display?.description ?? description,
                        imageUri: safeUrl,
                        link: display?.link,
                        creator: display?.creator,
                        projectUrl: display?.project_url,
                        display,
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