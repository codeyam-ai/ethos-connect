import type { IdentifierString } from '@mysten/wallet-standard';

export interface Preapproval {
  target: `${string}::${string}::${string}`,
  chain: IdentifierString,
  address?: string,
  objectId: string,
  description: string,
  totalGasLimit: number;
  perTransactionGasLimit: number;
  maxTransactionCount: number;
}