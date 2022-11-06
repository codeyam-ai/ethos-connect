const nft = {
    details: {
        data: {
            type: 'random-address',
            fields: {
                url: "IMAGE",
                name: "NAME"
            }
        }
    },
    reference: {
        objectId: 'NFT'
    }
}

const coin = {
    details: {
        data: {
            type: '0x2::coin::Coin<0x2::sui::SUI>',
            fields: {
                balance: 10000
            }
        }
    },
    reference: {
        objectId: 'COIN'
    }
}

const getObjectsOwnedByAddress = jest.fn(
    () => Promise.resolve([coin, nft].map((o: any) => ({ objectId: o.reference.objectId })))
)

const getObjectBatch = jest.fn(
    (objectIds: string[]) => {
        return [coin, nft].filter(
            (o: any) => objectIds.includes(o.reference.objectId)
        )
    }
)

export default {
    coin,
    nft, 
    getObjectsOwnedByAddress,
    getObjectBatch,
    provider: {
        getObjectsOwnedByAddress,
        getObjectBatch
    }
}