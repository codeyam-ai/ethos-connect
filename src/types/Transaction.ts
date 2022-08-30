export interface EthosTransaction {
  id?: string
  network: string | number
  address?: string
  signOnly?: boolean
}

export interface SuiTransaction extends EthosTransaction {
  gasBudget?: number
}

export interface SuiTransferTransaction extends SuiTransaction {
  recipientAddress?: string
}

export interface SuiCoinTransferTransaction extends SuiTransferTransaction {
  value?: number
}

export interface SuiObjectTransferTransaction extends SuiTransferTransaction {
  objectId?: string
}

export interface SuiFunctionTransaction extends SuiTransaction {
  moduleName?: string
  functionName?: string
  inputValues?: any,
  typeArguments?: string[]
}

export interface SuiSignedTransaction extends EthosTransaction {
  signedInfo?: any
}

export interface BulkSuiTransaction extends EthosTransaction {
  transactions: EthosTransaction[]
} 
