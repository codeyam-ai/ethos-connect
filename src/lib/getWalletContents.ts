import { CoinBalance, Connection, JsonRpcProvider, PaginatedObjectsResponse, SUI_TYPE_ARG, SuiObjectData, SuiObjectResponse } from "@mysten/sui.js";
import { SuiNFT, WalletContents } from "../types/WalletContents";
import { newBN, sumBN } from './bigNumber';
import getBagNFT, { isBagNFT } from "./getBagNFT";
// import fetchSui from "./fetchSui";
import { ConvenenienceSuiObject } from '../types/ConvenienceSuiObject';
import { DEFAULT_NETWORK } from './constants';
import getDisplay from "./getDisplay";
import { getKioskObjects, isKiosk } from "./getKioskNFT";
import { ExtendedSuiObjectData } from "types/ExtendedSuiObjectData";
import store from "store2";
import { InvalidPackages } from "types/InvalidPackages";

export const ipfsConversion = (src?: string): string => {
    if (!src) return "";
    if (src.indexOf('ipfs') === 0) {  
        return src.replace(/^ipfs:\/\//, 'https://ipfs.io/ipfs/');
    }
    return src;
}

export type GetWalletContentsArgs = {
    address: string,
    network: string,
    existingContents?: WalletContents,
    invalidPackageModifications?: InvalidPackages
}

const empty: WalletContents = {
    suiBalance: newBN(0),
    balances: {},
    nfts: [],
    tokens: {},
    objects: []  
}

const getWalletContents = async ({ address, network, existingContents, invalidPackageModifications }: GetWalletContentsArgs): Promise<WalletContents | null> => {
    try {
        const connection = new Connection({ fullnode: network || DEFAULT_NETWORK })
        const provider = new JsonRpcProvider(connection);

        if (!address) {
            return empty
        }

        let invalidPackages: string[] = [];
        try {
            invalidPackages = store.get('invalidPackages') ?? [];
            const invalidPackagesResponse = await fetch('https://raw.githubusercontent.com/EthosWallet/valid_packages/main/public/invalid_tokens.json');
            invalidPackages = await invalidPackagesResponse.json();
            store.set('invalidPackages', invalidPackages);

            if (invalidPackageModifications?.invalidPackageAdditions) {
                invalidPackages = invalidPackages.concat(invalidPackageModifications.invalidPackageAdditions);
            }

            if (invalidPackageModifications?.invalidPackageSubtractions) {
                invalidPackages = invalidPackages.filter(
                    (packageId) => !invalidPackageModifications.invalidPackageSubtractions.includes(packageId)
                );
            }
        } catch (e) {
            console.error(e);
        }

        const coinBalances = await provider.getAllBalances({ owner: address });
        const validCoinBalances = coinBalances.filter((coinBalance) => (
            !invalidPackages.includes(coinBalance.coinType.split('::')[0])
        ));

        let objectInfos: SuiObjectResponse[] = [];
        let nextCursor: PaginatedObjectsResponse['nextCursor'] | undefined = undefined;
        let limitedNextCursor: PaginatedObjectsResponse['nextCursor'] | undefined | null = undefined;
        let page = 0;
        let hasNextPage = false;
        while (limitedNextCursor !== null) {
            page += 1;

            const pageObjectInfos: PaginatedObjectsResponse = await provider.getOwnedObjects({
                owner: address,
                options: {
                    showType: true,
                    showOwner: true,
                    showContent: true,
                    showDisplay: true,
                },
                cursor: limitedNextCursor
            });

            objectInfos = [
                ...objectInfos,
                ...pageObjectInfos.data
            ];

            hasNextPage = pageObjectInfos.hasNextPage;

            if (page > 20) {
                limitedNextCursor = null;
            } else {
                if (hasNextPage && nextCursor !== pageObjectInfos.nextCursor) {
                    limitedNextCursor = pageObjectInfos.nextCursor ?? null;
                } else {
                    limitedNextCursor = null;
                }
            }
        }

        if (objectInfos.length === 0) {
            if (existingContents === empty) {
                return null;
            }
            return empty;
        }

        const currentObjects: ExtendedSuiObjectData[] = [];
        let newObjectInfos: ExtendedSuiObjectData[] = [];
        if (existingContents?.objects && existingContents.objects.length > 0) {
            const allObjectDatas = objectInfos.map(
                (objectInfo) => objectInfo.data
            ) as ExtendedSuiObjectData[];

            for (const data of allObjectDatas) {
                if (!data) continue;
                
                if (isKiosk(data)) {
                    const kioskObjects = await getKioskObjects(provider, data)
                    
                    for (const kioskObject of kioskObjects) {
                        if (kioskObject.data) {
                            allObjectDatas.push({
                                ...kioskObject.data,
                                kiosk: data    
                            })
                        }
                    }
                }
            }
            for (const data of allObjectDatas) {
                if (!data) continue;
                const existingObject = existingContents?.objects.find(
                    (existingObject) => {
                        if (
                            typeof data === "object"
                        ) {
                            return (
                                existingObject.objectId === data.objectId &&
                                existingObject.version.toString() === data.version.toString()
                            )    
                        } else {
                            return false;
                        }
                    }
                );
                
                if (existingObject) {
                    currentObjects.push(existingObject);
                } else {
                    newObjectInfos.push(data);
                }
            }
        } else {
            newObjectInfos = objectInfos
                .filter((objectInfo) => !!objectInfo.data && !objectInfo.error)
                .map((objectInfo) => objectInfo.data as SuiObjectData);
        }

        if (newObjectInfos.length === 0) return null;

        const newObjects = newObjectInfos;
        const objects = currentObjects.concat(newObjects);

        let suiBalance = newBN(0);
        const balances = validCoinBalances.reduce(
            (acc, coinBalance) => {
                acc[coinBalance.coinType] = coinBalance;
                if (coinBalance.coinType === SUI_TYPE_ARG) {
                    suiBalance = newBN(coinBalance.totalBalance);
                }
                return acc;
            }, 
            {} as Record<string, CoinBalance>
        )

        const nfts: SuiNFT[] = [];
        const tokens: {[key: string]: any}= {};
        const convenenienceObjects: ConvenenienceSuiObject[] = [];
        for (const data of objects) {
            const { display, content } = data;
            const { fields } = (content?.dataType === "moveObject" ? content : { fields: {} as Record<string, string>});
            const safeDisplay = getDisplay(display);
            try {
                const typeStringComponents = (data.type || "").split('<');
                const subtype = (typeStringComponents[1] || "").replace(/>/, '')
                const typeComponents = typeStringComponents[0].split('::');
                const packageObjectId = typeComponents[0];
                const moduleName = typeComponents[1];
                const structName = typeComponents[typeComponents.length - 1];

                if (invalidPackages.includes(packageObjectId)) continue;    

                const safeUrl = ipfsConversion(
                    safeDisplay?.image_url ??
                    safeDisplay?.img_url ??
                    safeDisplay?.url ??
                    fields?.url ??
                    fields?.image_url ??
                    fields?.img_url
                );  

                convenenienceObjects.push({
                    ...data,
                    packageObjectId,
                    moduleName,
                    structName,
                    name: safeDisplay?.name ?? fields?.name,
                    description: safeDisplay?.description ?? fields?.description,
                    imageUrl: safeUrl,
                    display: safeDisplay,
                    fields,
                    isCoin: structName === 'Coin'
                })

                if (structName === 'Coin') {
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
                        display: safeDisplay
                    })
                } else if (isBagNFT(data)) {
                    const bagNFT = await getBagNFT(provider, data);
                    
                    if ("name" in bagNFT) {
                        nfts.push({
                            type: data.type ?? "unknown", 
                            packageObjectId, 
                            moduleName, 
                            structName,
                            chain: 'Sui',
                            address: data?.objectId,
                            objectId: data?.objectId,
                            name: safeDisplay?.name ?? bagNFT.name,
                            description: safeDisplay?.description ?? bagNFT.description,
                            imageUrl: safeUrl,
                            link: safeDisplay?.link,
                            creator: safeDisplay?.creator,
                            projectUrl: safeDisplay?.project_url,
                            display: safeDisplay,
                            links: {
                                'Explorer': `https://explorer.sui.io/objects/${data.objectId}`
                            },
                            kiosk: data.kiosk
                        });       
                    }
                } else {
                    if (safeUrl) {
                        nfts.push({
                            type: data.type ?? "Unknown",
                            packageObjectId,
                            moduleName,
                            structName,
                            chain: 'Sui',
                            address: data?.objectId,
                            objectId: data?.objectId,
                            name: safeDisplay?.name ?? fields?.name,
                            description: safeDisplay?.description ?? fields?.description,
                            imageUrl: safeUrl,
                            link: safeDisplay?.link,
                            creator: safeDisplay?.creator,
                            projectUrl: safeDisplay?.project_url,
                            display: safeDisplay,
                            fields,
                            links: {
                                'Explorer': `https://explorer.sui.io/objects/${data.objectId}`
                            },
                            kiosk: data.kiosk
                        });    
                    }
                }
            } catch (error: unknown) {
                console.log("Error retrieving object", data, error);
            }
        }

        return { 
            suiBalance, 
            balances, 
            tokens, 
            nfts, 
            objects: convenenienceObjects, 
            hasNextPage,
            nextCursor: nextCursor ?? undefined
        };
    } catch (error: unknown) {
        console.log("Error retrieving wallet contents", error);
        return null;
    }
}

export default getWalletContents;