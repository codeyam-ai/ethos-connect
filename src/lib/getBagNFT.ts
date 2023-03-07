import { is, SuiObject } from '@mysten/sui.js';
import _ from 'lodash';

import type {
    GetObjectDataResponse,
    JsonRpcProvider,
    SuiMoveObject    
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
    suiObject: SuiObject,
    rpcResponse: GetObjectDataResponse
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
    /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::UrlDomain>, (0x[a-f0-9]{39,40})::display::UrlDomain>/;
const DisplayDomainRegex =
    /0x2::dynamic_field::Field<(0x[a-f0-9]{39,40})::utils::Marker<(0x[a-f0-9]{39,40})::display::DisplayDomain>, (0x[a-f0-9]{39,40})::display::DisplayDomain>/;

const ID_PATH = 'reference.objectId';
const BAG_ID_PATH = 'data.fields.bag.fields.id.id';
const LOGICAL_OWNER_PATH = 'data.fields.logical_owner';

export const NftParser: SuiObjectParser<NftRpcResponse, NftRaw> = {
    parser: (data, suiData, rpcResponse) => {
        if (
            typeof rpcResponse.details === 'object' &&
            'data' in rpcResponse.details
        ) {
            const { owner } = rpcResponse.details;

            const matches = (suiData.data as SuiMoveObject).type.match(
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
                type: suiData.data.dataType,
                id: rpcResponse.details.reference.objectId,
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

const isTypeMatchRegex = (d: GetObjectDataResponse, regex: RegExp) => {
    const { details } = d;
    if (is(details, SuiObject)) {
        const { data } = details;
        if ('type' in data) {
            return data.type.match(regex);
        }
    }
    return false;
};

export const parseDomains = (domains: GetObjectDataResponse[]) => {
    const response: Partial<NftDomains> = {};
    const urlDomain = domains.find((d) => isTypeMatchRegex(d, UrlDomainRegex));
    const displayDomain = domains.find((d) =>
        isTypeMatchRegex(d, DisplayDomainRegex)
    );

    if (
        urlDomain &&
        is(urlDomain.details, SuiObject) &&
        'fields' in urlDomain.details.data
    ) {
        const { data } = urlDomain.details;
        response.url = (data.fields as UrlDomainRpcResponse).value.fields.url;
    }
    if (
        displayDomain &&
        is(displayDomain.details, SuiObject) &&
        'fields' in displayDomain.details.data
    ) {
        const { data } = displayDomain.details;
        response.description = (
            data.fields as DisplayDomainRpcResponse
        ).value.fields.description;
        response.name = (
            data.fields as DisplayDomainRpcResponse
        ).value.fields.name;
    }

    return response;
};

export const isBagNFT = (nft: SuiObject): boolean => {
    return (
        nft?.data &&
        'fields' in nft.data &&
        'logical_owner' in nft.data.fields &&
        'bag' in nft.data.fields
    );
}

const getBagNFT = async (provider: JsonRpcProvider, nft: SuiObject) => {
    if (
        !isBagNFT(nft) ||
        !_.has(nft, ID_PATH) ||
        !_.has(nft, BAG_ID_PATH) ||
        !_.has(nft, LOGICAL_OWNER_PATH)
    ) return nft;    

    const id = _.get(nft, ID_PATH);
    const bagId = _.get(nft, BAG_ID_PATH);
    const owner = _.get(nft, LOGICAL_OWNER_PATH);
    const bagObjects = await provider.getDynamicFields(bagId || "");
    const objectIds = bagObjects.data.map((bagObject) => bagObject.objectId);
    const objects = await provider.getObjectBatch(objectIds);
    return {
        id,
        owner,
        ...parseDomains(objects),
    };
}

export default getBagNFT;