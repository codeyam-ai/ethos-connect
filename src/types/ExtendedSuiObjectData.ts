import { SuiObjectData } from "@mysten/sui.js/client";

export interface ExtendedSuiObjectData extends SuiObjectData {
    kiosk?: SuiObjectData;
}