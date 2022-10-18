import type { ObjectId } from '@mysten/sui.js';

export interface Preapproval {
  module: string,
  function: string,
  objectId: ObjectId,
  description: string,
  totalGasLimit: number;
  perTransactionGasLimit: number;
  maxTransactionCount: number;
}