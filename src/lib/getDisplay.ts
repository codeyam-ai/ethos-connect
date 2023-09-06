import type { SuiObjectData } from '@mysten/sui.js/client';

const getDisplay = (
    display?: SuiObjectData['display'] | Record<string, string>
): Record<string, string> | null => {
    if (!display) return null;
    if ("data" in display &&  display.data && typeof display.data === "object") {
        return display.data;
    }  
    return display as Record<string, string>;
};

export default getDisplay;
