import { SuiObjectData } from "@mysten/sui.js";

export interface ExtendedSuiObjectData extends SuiObjectData {
    kiosk?: SuiObjectData;
}