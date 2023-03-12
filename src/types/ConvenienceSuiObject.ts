import { SuiObjectData } from "@mysten/sui.js";

export interface ConvenenienceSuiObject extends SuiObjectData {
    objectId: string,
    type: string,
    name?: string,
    description?: string
}