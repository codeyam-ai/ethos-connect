import { JsonRpcProvider, SuiObjectData, SuiObjectResponse } from "@mysten/sui.js";
import _ from 'lodash';

export const isKiosk = (data: SuiObjectData): boolean => {
    return (
        !!data.type &&
        data.type.includes('kiosk') &&
        !!data.content &&
        'fields' in data.content &&
        'kiosk' in data.content.fields
    );
}

export const getKioskObjects = async (
    provider: JsonRpcProvider,
    data: SuiObjectData
): Promise<SuiObjectResponse[]> => {
    if (!isKiosk(data)) return [];
    const kiosk = _.get(data, 'content.fields.kiosk');
    if (!kiosk) return [];
    const allKioskObjets = await provider.getDynamicFields({
        parentId: kiosk,
    });
    const relevantKioskObjects = allKioskObjets.data.filter(
        (kioskObject) => kioskObject.name.type === '0x2::kiosk::Item'
    );
    const objectIds = relevantKioskObjects.map((item) => item.objectId);

    const objects = await provider.multiGetObjects({
        ids: objectIds,
        options: {
            showContent: true,
            showType: true,
            showDisplay: true,
            showOwner: true,
        },
    });
    return objects;
}