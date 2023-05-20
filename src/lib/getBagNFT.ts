import { getObjectFields, is, SuiObjectData } from '@mysten/sui.js';
import has from 'lodash-es/has';
import get from 'lodash-es/get';
import { ipfsConversion } from '../lib/getWalletContents';

import type {
    JsonRpcProvider,
    SuiMoveObject,
    SuiObjectResponse,    
} from '@mysten/sui.js';

export type BagNFT = {
    id: string;
    owner?: string;
    name?: string;
    description?: string;
    url?: string;
};

export interface WithIds {
    objectIds: string[];
}

type FetchFnParser<RpcResponse, DataModel> = (
    typedData: RpcResponse,
    suiObject: SuiObjectData,
    rpcResponse: SuiObjectResponse
) => DataModel | undefined;

type SuiObjectParser<RpcResponse, DataModel> = {
    parser: FetchFnParser<RpcResponse, DataModel>;
    regex: RegExp;
};

type ID = {
    id: string;
};

type Bag = {
    type: string;
    fields: {
        id: ID;
        size: number;
    };
};

type NftRpcResponse = {
    logical_owner: string;
    bag: Bag;
};

type NftRaw = {
    id: string;
    logicalOwner: string;
    bagId: string;
};

type DomainRpcBase<T> = {
    id: ID;
    name: {
        type: string;
        fields: {
            dummy_field: boolean;
        };
    };
    value: {
        type: string;
        fields: T;
    };
};

type UrlDomainRpcResponse = DomainRpcBase<{
    url: string;
}>;

type DisplayDomainRpcResponse = DomainRpcBase<{
    description: string;
    name: string;
}>;

type NftDomains = {
    url: string;
    name: string;
    description: string;
};

export type Nft = {
    nft: NftRaw;
    fields?: Partial<NftDomains>;
};

const NftRegex =
    /(0x[a-f0-9]{39,40})::nft::Nft<0x[a-f0-9]{39,40}::([a-zA-Z]{1,})::([a-zA-Z]{1,})>/;
const UrlDomainRegex =
    /0x0000000000000000000000000000000000000000000000000000000000000002::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::UrlDomain>, (0x[a-f0-9]{39,40})::display::UrlDomain>/;
const DisplayDomainRegex =
    /0x0000000000000000000000000000000000000000000000000000000000000002::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::DisplayDomain>, (0x[a-f0-9]{39,40})::display::DisplayDomain>/;

const ID_PATH = 'reference.objectId';
const BAG_ID_PATH = 'data.fields.bag.fields.id.id';
const LOGICAL_OWNER_PATH = 'data.fields.logical_owner';

export const NftParser: SuiObjectParser<NftRpcResponse, NftRaw> = {
    parser: (data, suiData, rpcResponse) => {
        if (
            typeof rpcResponse.data === 'object' &&
            'owner' in rpcResponse.data
        ) {
            const { owner } = rpcResponse.data;

            const matches = (suiData.content as SuiMoveObject).type.match(
                NftRegex
            );
            if (!matches) {
                return undefined;
            }
            const packageObjectId = matches[1];
            const packageModule = matches[2];
            const packageModuleClassName = matches[3];

            return {
                owner,
                type: suiData.content?.dataType,
                id: rpcResponse.data.objectId,
                packageObjectId,
                packageModule,
                packageModuleClassName,
                rawResponse: rpcResponse,
                logicalOwner: data.logical_owner,
                bagId: data.bag.fields.id.id,
            };
        }
        return undefined;
    },
    regex: NftRegex,
};

const isTypeMatchRegex = (d: SuiObjectResponse, regex: RegExp) => {
    const { data } = d;
    if (is(data, SuiObjectData)) {
        const { content } = data;
        if (content && 'type' in content) {
            return content.type.match(regex);
        }
    }
    return false;
};

export const parseDomains = (domains: SuiObjectResponse[]) => {
    const response: Partial<NftDomains> = {};
    const urlDomain = domains.find((d) => isTypeMatchRegex(d, UrlDomainRegex));
    const displayDomain = domains.find((d) =>
        isTypeMatchRegex(d, DisplayDomainRegex)
    );

    if (urlDomain && getObjectFields(urlDomain)) {
        const url = (getObjectFields(urlDomain) as UrlDomainRpcResponse).value
            .fields.url;
        response.url = ipfsConversion(url);
    }
    if (displayDomain && getObjectFields(displayDomain)) {
        response.description = (
            getObjectFields(displayDomain) as DisplayDomainRpcResponse
        ).value.fields.description;
        response.name = (
            getObjectFields(displayDomain) as DisplayDomainRpcResponse
        ).value.fields.name;
    }

    return response;
};

export const isBagNFT = (data: SuiObjectData): boolean => {
    return (
        !!data.content &&
            'fields' in data.content &&
            'logical_owner' in data.content.fields &&
            'bag' in data.content.fields
    );
}

const getBagNFT = async (provider: JsonRpcProvider, data: SuiObjectData) => {
    if (
        !isBagNFT(data) ||
        !has(data, ID_PATH) ||
        !has(data, BAG_ID_PATH) ||
        !has(data, LOGICAL_OWNER_PATH)
    ) return data;    

    const id = get(data, ID_PATH);
    const bagId = get(data, BAG_ID_PATH);
    const owner = get(data, LOGICAL_OWNER_PATH);
    const bagObjects = await provider.getDynamicFields({ parentId: bagId || "" });
    const objectIds = bagObjects.data.map((bagObject) => bagObject.objectId);
    const objects = await provider.multiGetObjects({
        ids: objectIds,
        options: {
            showContent: true,
            showDisplay: true,
            showOwner: true,
            showType: true
        }
    });
    return {
        id,
        owner,
        ...parseDomains(objects),
    };
}

export default getBagNFT;