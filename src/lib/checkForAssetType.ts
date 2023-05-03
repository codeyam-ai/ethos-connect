import { ObjectId, PaginatedObjectsResponse, SuiObjectDataFilter, SuiObjectDataOptions } from "@mysten/sui.js";
import { Signer } from "../types/Signer";
import { Wallet } from '../types/Wallet';

export interface CheckForAssetTypeArgs { 
    signer?: Signer;
    wallet?: Wallet;
    type?: ObjectId;
    cursor?: PaginatedObjectsResponse['nextCursor'];
    options?: SuiObjectDataOptions;
    filter: SuiObjectDataFilter;
}

const checkForAssetType = async ({ signer, wallet, type, cursor, options, filter }: CheckForAssetTypeArgs) => {
    let owner;
    if (wallet) {
        owner = wallet.address;
    } else if (signer) {
        owner = signer.currentAccount?.address;
    }

    if (!owner) return;

    const provider = (signer ?? wallet)?.provider;

    if (!provider) return;
    
    const assets = await provider.getOwnedObjects({
        owner,
        filter: filter ?? {
            StructType: type
        },
        options: options ?? {
            showContent: true,
            showDisplay: true
        },
        cursor
    })

    return assets;
}

export default checkForAssetType;