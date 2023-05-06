import { SuiObjectData } from "@mysten/sui.js";

export interface ConvenenienceSuiObject extends SuiObjectData {
    packageObjectId: string,
    moduleName: string,
    structName: string,
    name?: string,
    description?: string
    imageUrl?: string,
    fields?: Record<string, string>,
    display?: Record<string, string>,
    isCoin: boolean,
    kiosk?: SuiObjectData
}