import { ContractInterface } from "ethers";

export type QueryRequest = {
    network: any,
    address: string,
    abi: ContractInterface,
    functionName: string,
    inputValues: any[],
    host: string,
}