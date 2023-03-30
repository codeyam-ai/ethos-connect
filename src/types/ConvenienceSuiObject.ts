import { SuiObjectData } from "@mysten/sui.js";

export interface ConvenenienceSuiObject extends SuiObjectData {
    objectId: string,
    verson: number,
    type: string,
    name?: string,
    description?: string
    display?: Record<string, string>
}