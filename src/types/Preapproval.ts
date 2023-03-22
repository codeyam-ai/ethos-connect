import type { ObjectId } from '@mysten/sui.js';
import type { IdentifierString } from '@mysten/wallet-standard';

export interface Preapproval {
  target: `${string}::${string}::${string}`,
  chain: IdentifierString,
  address?: string,
  objectId: ObjectId,
  description: string,
  totalGasLimit: number;
  perTransactionGasLimit: number;
  maxTransactionCount: number;
}