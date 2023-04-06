import type { SuiObjectData } from '@mysten/sui.js';

const getDisplay = (
    display?: SuiObjectData['display']
): Record<string, string> | undefined => {
    if (!display) return;
    if (display?.data && typeof display?.data === 'object') {
        return display.data;
    }
    if (!('error' in display)) return display;
    return;
};

export default getDisplay;
