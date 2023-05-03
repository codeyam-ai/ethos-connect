import { ObjectId, PaginatedObjectsResponse } from "@mysten/sui.js";
import { Signer } from "../types/Signer";
import { Wallet } from '../types/Wallet';

const checkForAssetType = async ({ signer, wallet, type, cursor }: { signer?: Signer, wallet?: Wallet, type: ObjectId, cursor?: PaginatedObjectsResponse['nextCursor'] }) => {
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
        filter: {
            StructType: type
        },
        cursor
    })

    return assets;
}

export default checkForAssetType;