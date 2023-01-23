import { SuiObject } from "@mysten/sui.js";

export interface ConvenenienceSuiObject extends SuiObject {
    objectId: string,
    type: string,
    name?: string,
    description?: string
}