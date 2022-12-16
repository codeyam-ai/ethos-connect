import { newBN } from "../src/lib/bigNumber"

const nft = {
    details: {
        data: {
            type: 'random-address',
            fields: {
                url: "IMAGE",
                name: "NAME"
            }
        },
        reference: {
            objectId: 'NFT',
            version: 1
        }
    }
}

const suiCoin = {
    details: {
        data: {
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            fields: {
                balance: newBN(10000)
            }
        },
        reference: {
            objectId: 'COIN1',
            version: 2
        }
    }    
}

const suiCoin2 = {
    details: {
        data: {
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            fields: {
                balance: newBN(5000)
            }
        },
        reference: {
            objectId: 'COIN2',
            version: 6
        }
    }    
}

const suiCoin3 = {
    details: {
        data: {
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            fields: {
                balance: newBN(50000)
            }
        },
        reference: {
            objectId: 'COIN3',
            version: 36
        }
    }    
}

const getObjectsOwnedByAddress = jest.fn(
    () => Promise.resolve([suiCoin, suiCoin2, nft].map((o: any) => ({ 
        objectId: o.details.reference.objectId,
        version: o.details.reference.version
    })))
)

const getObjectBatch = jest.fn(
    (objectIds: string[]) => {
        return [suiCoin, suiCoin2, suiCoin3, nft].filter(
            (o: any) => objectIds.includes(o.details.reference.objectId)
        )
    }
)

export default {
    suiCoin,
    suiCoin2,
    suiCoin3,
    nft, 
    getObjectsOwnedByAddress,
    getObjectBatch,
    provider: {
        getObjectsOwnedByAddress,
        getObjectBatch
    }
}