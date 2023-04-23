import { SuiObjectData } from "@mysten/sui.js";

export interface ConvenenienceSuiObject extends SuiObjectData {
    name?: string,
    description?: string
    imageUrl?: string,
    fields?: Record<string, string>,
    display?: Record<string, string>
}