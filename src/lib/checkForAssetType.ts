import { ObjectId, PaginatedObjectsResponse, SuiObjectDataFilter } from "@mysten/sui.js";
import { Signer } from "../types/Signer";
import { Wallet } from '../types/Wallet';
import { getKioskObjects } from "./getKioskNFT";
import {SuiObjectDataOptions, SuiObjectData} from '@mysten/sui.js/client'

export interface CheckForAssetTypeArgs { 
    signer?: Signer;
    wallet?: Wallet;
    type?: ObjectId;
    cursor?: PaginatedObjectsResponse['nextCursor'];
    options?: SuiObjectDataOptions;
    filter?: SuiObjectDataFilter;
}

const checkForAssetType = async ({ signer, wallet, type, cursor, options, filter }: CheckForAssetTypeArgs) => {
    let owner;
    if (wallet) {
        owner = wallet.address;
    } else if (signer) {
        owner = signer.currentAccount?.address;
    }

    if (!owner) return;

    const client = (signer ?? wallet)?.client;

    if (!client) return;
    
    let kioskAssets: SuiObjectData[] = [];
    if (!cursor) {
        const kioskTokens = await client.getOwnedObjects({
            owner,
            filter: {
                StructType: "0x95a441d389b07437d00dd07e0b6f05f513d7659b13fd7c5d3923c7d9d847199b::ob_kiosk::OwnerToken"
            },
            options: options ?? {
                showContent: true,
                showType: true,
            },
            cursor
        })
    
        for (const kioskToken of kioskTokens.data) {
            if (kioskToken.data) {
                const kioskObjects = await getKioskObjects(client, kioskToken.data)
                for (const kioskObject of kioskObjects) {
                    if (kioskObject.data && kioskObject.data?.type === type) {
                        kioskAssets.push(kioskObject.data);
                    }
                }
            }
        }    
    }

    const assets = await client.getOwnedObjects({
        owner,
        filter: filter ?? {
            StructType: type ?? ''
        },
        options: options ?? {
            showContent: true,
            showDisplay: true
        },
        cursor
    })

    return {
        assets: (assets.data ?? []).map((a) => a.data).concat(kioskAssets),
        nextCursor: assets.nextCursor
    }
}

export default checkForAssetType;