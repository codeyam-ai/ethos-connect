import { ethers } from "ethers";
import { CustomBaseContract } from "./CustomBaseContract";
import { Signer } from "../Signer";

export class Contract extends CustomBaseContract {
    // The meta-class properties
    readonly [key: string]: ethers.ContractFunction | any;

    constructor(addressOrName: string, contractInterface: ethers.ContractInterface, signerOrProvider?: Signer | Provider) {
        super(addressOrName, contractInterface, signerOrProvider);
    }
}
