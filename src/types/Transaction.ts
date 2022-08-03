export interface EthosTransaction {
  address: string
  network: string | number
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
  inputValues?: any
}
