import type { SuiObjectData } from '@mysten/sui.js/client';

const getDisplay = (
    display?: SuiObjectData['display']
): Record<string, string> | null => {
    if (!display) return null;
    return display.data ?? null;
};

export default getDisplay;
