import { newBN, sumBN } from "../src/lib/bigNumber"

const nft = {
    data: {
        type: 'PACKAGE::MODULE::NFT',
        content: {
            dataType: "moveObject",
            fields: {
                url: "IMAGE",
                name: "NAME"
            }
        },
        objectId: 'NFT',
        version: 1,
        digest: "NFT"
    }
}

const suiCoin = {
    data: {
        type: '0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI>',
        content: {
            dataType: "moveObject",
            fields: {
                balance: newBN(10000)
            }
        },
        objectId: 'COIN1',
        version: 2,
        digest: "COIN1"
    }    
}

const suiCoin2 = {
    data: {
        type: '0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI>',
        content: {
            dataType: "moveObject",
            fields: {
                balance: newBN(5000)
            }
        },
        objectId: 'COIN2',
        version: 6,
        digest: "COIN2"
    }    
}

const suiCoin3 = {
    data: {
        type: '0x0000000000000000000000000000000000000000000000000000000000000002::coin::Coin<0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI>',
        content: {
            dataType: "moveObject",
            fields: {
                balance: newBN(50000)
            }
        },
        objectId: 'COIN3',
        version: 36,
        digest: "COIN3"
    }    
}

const getOwnedObjects = jest.fn(
    () => Promise.resolve({
        data: [suiCoin, suiCoin3, nft]
    })
)

const multiGetObjects = jest.fn(
    ({ ids }: { ids: string[] }) => {
        return [suiCoin, suiCoin2, suiCoin3, nft].filter(
            (o: any) => ids.includes(o.data.objectId)
        )
    }
)

const getAllBalances = jest.fn(
    () => {
        return [
            {
                coinType: '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI',
                totalBalance: [suiCoin, suiCoin3].reduce(
                    (acc, c) => sumBN(acc, c.data.content.fields.balance), 
                    newBN(0)
                ).toString(),
            }
        ]
    }
)

export default {
    suiCoin,
    suiCoin2,
    suiCoin3,
    nft, 
    getOwnedObjects,
    multiGetObjects,
    getAllBalances,
    client: {
        getOwnedObjects,
        multiGetObjects,
        getAllBalances
    }
}