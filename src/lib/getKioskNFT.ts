import { DynamicFieldInfo, SuiClient, SuiObjectData, SuiObjectResponse } from "@mysten/sui.js/client";
import get from 'lodash-es/get.js';

export const isKiosk = (data: SuiObjectData): boolean => {
    return (
        !!data.type &&
        data.type.includes('kiosk') &&
        !!data.content &&
        'fields' in data.content && (
            'kiosk' in data.content.fields ||
            'for' in data.content.fields
        )
    );
}

export const getKioskObjects = async (
    client: SuiClient,
    data: SuiObjectData
): Promise<SuiObjectResponse[]> => {
    if (!isKiosk(data)) return [];
        let kiosk = get(data, 'content.fields.kiosk');
        if (!kiosk) kiosk = get(data, 'content.fields.for');
        if (!kiosk) return [];
        let allKioskObjects: DynamicFieldInfo[] = [];
        let cursor: string | undefined | null;
        while (cursor !== null) {
            const response = await client.getDynamicFields({
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
            (kioskObject) => (
                kioskObject.name.type === '0x0000000000000000000000000000000000000000000000000000000000000002::kiosk::Item' ||
                kioskObject.name.type === '0x2::kiosk::Item'
            )
        );
        const objectIds = relevantKioskObjects.map((item) => item.objectId);

        let objects: SuiObjectResponse[] = [];
        const groupSize = 30;
        for (let i = 0; i < objectIds.length; i += groupSize) {
            const group = objectIds.slice(i, i + groupSize);

            const groupObjects = await client.multiGetObjects({
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