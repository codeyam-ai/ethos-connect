import { JsonRpcProvider, SuiObjectData, SuiObjectResponse } from "@mysten/sui.js";
import { DynamicFieldInfo } from "@mysten/sui.js/dist/types/dynamic_fields";
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
        let allKioskObjects: DynamicFieldInfo[] = [];
        let cursor: string | undefined | null;
        while (cursor !== null) {
            const response = await provider.getDynamicFields({
                parentId: kiosk,
                cursor
            });
            if (!response.data) return [];
            allKioskObjects = [...(allKioskObjects || []), ...response.data];
            if (response.hasNextPage && response.nextCursor !== cursor) {
                cursor = response.nextCursor;
            } else {
                cursor = null;                
            }
        }

        const relevantKioskObjects = allKioskObjects.filter(
            (kioskObject) => kioskObject.name.type === '0x0000000000000000000000000000000000000000000000000000000000000002::kiosk::Item'
        );
        const objectIds = relevantKioskObjects.map((item) => item.objectId);

        let objects: SuiObjectResponse[] = [];
        const groupSize = 30;
        for (let i = 0; i < objectIds.length; i += groupSize) {
            const group = objectIds.slice(i, i + groupSize);

            const groupObjects = await provider.multiGetObjects({
                ids: group,
                options: {
                    showContent: true,
                    showType: true,
                    showDisplay: true,
                    showOwner: true,
                },
            });

            objects = [...objects, ...groupObjects];
        }

        return objects;
}