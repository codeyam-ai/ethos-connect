import { ButtonHTMLAttributes, ReactNode } from 'react';
import BigNumber from 'bignumber.js';
import * as _mysten_sui_js from '@mysten/sui.js';
import { ObjectId, TransactionBlock, SuiAddress, SuiTransactionBlockResponse, SignedTransaction, JsonRpcProvider } from '@mysten/sui.js';
export { IntentScope, TransactionBlock, verifyMessage } from '@mysten/sui.js';
import { WalletAdapter } from '@mysten/wallet-adapter-base';
import { IdentifierString, WalletAccount, SuiSignAndExecuteTransactionBlockInput, SuiSignMessageOutput } from '@mysten/wallet-standard';
export { WalletAccount } from '@mysten/wallet-standard';

interface WorkingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isWorking?: boolean;
    workingComponent?: ReactNode;
}

interface HoverColorButtonProps extends WorkingButtonProps {
    hoverBackgroundColor?: string;
    hoverChildren: ReactNode;
}

declare enum AddressWidgetButtons {
    CopyWalletAddress = "copy_wallet_address",
    WalletExplorer = "wallet_explorer",
    Logout = "logout"
}

interface AddressWidgetProps {
    includeMenu?: boolean;
    buttonColor?: string;
    extraButtons?: ReactNode[];
    excludeButtons?: AddressWidgetButtons[];
    externalContext?: any;
}

interface SuiNFTCollection {
    name: string;
    type: string;
}
interface SuiNFT {
    chain: string;
    type: string;
    package: string;
    module: string;
    address: string;
    objectId: string;
    name?: string;
    description?: string;
    imageUri?: string;
    link?: string;
    creator?: string;
    projectUrl?: string;
    display?: Record<string, string>;
    extraFields?: Record<string, string>;
    collection?: SuiNFTCollection;
    links?: Record<string, string>;
}
interface Coin {
    type: string;
    objectId: string;
    balance: BigNumber;
    digest: string;
    version: number;
}
interface Token {
    balance: number;
    coins: Coin[];
}
interface WalletContents {
    suiBalance: BigNumber;
    tokens: {
        [key: string]: Token;
    };
    nfts: SuiNFT[];
    objects: any[];
}

declare type GetWalletContentsArgs = {
    address: string;
    network: string;
    existingContents?: WalletContents;
};

interface Preapproval {
    target: `${string}::${string}::${string}`;
    chain: IdentifierString;
    address?: string;
    objectId: ObjectId;
    description: string;
    totalGasLimit: number;
    perTransactionGasLimit: number;
    maxTransactionCount: number;
}

declare type EthosSignMessageInput = {
    message: string | Uint8Array;
    account?: WalletAccount;
    chain?: string;
};

interface EthosSignTransactionBlockInput {
    transactionBlock: TransactionBlock;
    account?: WalletAccount;
    chain?: IdentifierString;
}

declare type EthosSignAndExecuteTransactionBlockInput = {
    transactionBlock: TransactionBlock;
    options?: SuiSignAndExecuteTransactionBlockInput['options'];
    requestType?: SuiSignAndExecuteTransactionBlockInput['requestType'];
    account?: WalletAccount;
    chain?: IdentifierString;
};

declare enum SignerType {
    Extension = "extension",
    Hosted = "hosted"
}
interface Signer {
    type: SignerType;
    name?: string;
    icon?: string;
    getAddress: () => Promise<SuiAddress | null>;
    accounts: readonly WalletAccount[];
    currentAccount: WalletAccount | null;
    signAndExecuteTransactionBlock: (input: EthosSignAndExecuteTransactionBlockInput) => Promise<SuiTransactionBlockResponse>;
    signTransactionBlock: (input: EthosSignTransactionBlockInput) => Promise<SignedTransaction>;
    requestPreapproval: (preApproval: Preapproval) => Promise<boolean>;
    signMessage: (input: EthosSignMessageInput) => Promise<SuiSignMessageOutput>;
    disconnect: () => void;
}
interface ExtensionSigner extends Signer {
    type: SignerType.Extension;
}
interface HostedSigner extends Signer {
    type: SignerType.Hosted;
    email?: string;
    logout: () => void;
}

interface Wallet extends Signer {
    address: SuiAddress;
    contents?: WalletContents;
}

declare enum EthosConnectStatus {
    Loading = "loading",
    NoConnection = "no_connection",
    Connected = "connected"
}

declare type WalletContextContents = {
    wallets?: WalletAdapter[];
    selectWallet?: ((walletName: string) => void);
    status: EthosConnectStatus;
    provider: JsonRpcProvider | null;
    wallet?: Wallet;
    altAccount?: WalletAccount;
    setAltAccount: (_account: WalletAccount) => void;
};

interface ModalContextContents {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

declare type ProviderAndSigner = {
    provider: JsonRpcProvider | null;
    signer: ExtensionSigner | HostedSigner | null;
};

declare enum Chain {
    SUI_DEVNET = "sui:devnet",
    SUI_TESTNET = "sui:testnet",
    SUI_CUSTOM = "sui:custom"
}

interface EthosConfiguration {
    apiKey?: string;
    walletAppUrl?: string;
    chain?: Chain;
    network?: string;
    hideEmailSignIn?: boolean;
    hideWalletSignIn?: boolean;
    preferredWallets?: string[];
    redirectTo?: string;
    disableAutoConnect?: boolean;
}

interface ConnectContextContents {
    wallet?: WalletContextContents;
    modal?: ModalContextContents;
    providerAndSigner?: ProviderAndSigner;
    ethosConfiguration?: EthosConfiguration;
    init: (configuration: EthosConfiguration) => void;
}

interface UseContextArgs {
    configuration?: EthosConfiguration;
    onWalletConnected?: (providerAndSigner: ProviderAndSigner) => void;
}

declare type PreapprovalArgs = {
    signer: any;
    preapproval: Preapproval;
};

declare type User = {
    email: string;
    wallet: string;
};

declare type loginArgs = {
    email?: string;
    provider?: string;
    apiKey?: string;
};

interface EthosConnectProviderProps {
    ethosConfiguration?: EthosConfiguration;
    onWalletConnected?: ({ provider, signer }: ProviderAndSigner) => void;
    connectMessage?: string | ReactNode;
    dappName?: string;
    dappIcon?: string | ReactNode;
    children: ReactNode;
}
declare const EthosConnectProvider: ({ ethosConfiguration, onWalletConnected, connectMessage, dappName, dappIcon, children }: EthosConnectProviderProps) => JSX.Element;

interface SignInButtonProps extends WorkingButtonProps {
    onLoaded?: () => void;
    externalContext?: any;
}
declare const SignInButton: (props: SignInButtonProps) => JSX.Element;

declare global {
    interface Window {
        ethosInternal: any;
    }
}

declare function showSignInModal(): void;
declare function hideSignInModal(): void;

interface DetachedEthosConnectProviderProps {
    context: any;
    connectMessage?: string | ReactNode;
    dappName?: string;
    dappIcon?: string | ReactNode;
    children: ReactNode;
}
declare const DetachedEthosConnectProvider: ({ context, connectMessage, dappName, dappIcon, children }: DetachedEthosConnectProviderProps) => JSX.Element;

declare const ethos: {
    login: ({ email, provider, apiKey }: loginArgs) => Promise<User | null | undefined>;
    logout: (signer: ExtensionSigner | HostedSigner, fromWallet?: boolean) => Promise<void>;
    sign: ({ signer, message }: {
        signer?: any;
        message: string | Uint8Array;
    }) => Promise<any>;
    transact: ({ signer, transactionInput }: {
        signer: ExtensionSigner | HostedSigner;
        transactionInput: EthosSignAndExecuteTransactionBlockInput;
    }) => Promise<{
        digest: string;
        timestampMs?: string | undefined;
        transaction?: {
            data: {
                sender: string;
                messageVersion: "v1";
                transaction: {
                    epoch: string;
                    storage_charge: string;
                    computation_charge: string;
                    storage_rebate: string;
                    kind: "ChangeEpoch";
                    epoch_start_timestamp_ms?: string | undefined;
                } | {
                    epoch: string;
                    round: string;
                    commit_timestamp_ms: string;
                    kind: "ConsensusCommitPrologue";
                } | {
                    objects: string[];
                    kind: "Genesis";
                } | {
                    transactions: ({
                        MoveCall: {
                            function: string;
                            package: string;
                            module: string;
                            arguments?: ("GasCoin" | {
                                Input: number;
                            } | {
                                Result: number;
                            } | {
                                NestedResult: [number, number];
                            })[] | undefined;
                            type_arguments?: string[] | undefined;
                        };
                    } | {
                        TransferObjects: [("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[], "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        SplitCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        MergeCoins: ["GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    } | {
                        Publish: [{
                            disassembled: Record<string, string>;
                        }, string[]];
                    } | {
                        Upgrade: [{
                            disassembled: Record<string, string>;
                        }, string[], string, "GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        }];
                    } | {
                        MakeMoveVec: [string | null, ("GasCoin" | {
                            Input: number;
                        } | {
                            Result: number;
                        } | {
                            NestedResult: [number, number];
                        })[]];
                    })[];
                    inputs: ({
                        type: "pure";
                        value: _mysten_sui_js.SuiJsonValue;
                        valueType?: string | undefined;
                    } | {
                        type: "object";
                        objectType: "immOrOwnedObject";
                        objectId: string;
                        version: string;
                        digest: string;
                    } | {
                        type: "object";
                        objectType: "sharedObject";
                        objectId: string;
                        initialSharedVersion: string;
                        mutable: boolean;
                    })[];
                    kind: "ProgrammableTransaction";
                };
                gasData: {
                    payment: {
                        objectId: string;
                        version: string | number;
                        digest: string;
                    }[];
                    owner: string;
                    price: string;
                    budget: string;
                };
            };
            txSignatures: string[];
        } | undefined;
        effects?: {
            messageVersion: "v1";
            status: {
                status: "success" | "failure";
                error?: string | undefined;
            };
            executedEpoch: string;
            gasUsed: {
                computationCost: string;
                storageCost: string;
                storageRebate: string;
                nonRefundableStorageFee: string;
            };
            transactionDigest: string;
            gasObject: {
                owner: "Immutable" | {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: number;
                    };
                };
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            };
            modifiedAtVersions?: {
                objectId: string;
                sequenceNumber: string;
            }[] | undefined;
            sharedObjects?: {
                objectId: string;
                version: string | number;
                digest: string;
            }[] | undefined;
            created?: {
                owner: "Immutable" | {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: number;
                    };
                };
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[] | undefined;
            mutated?: {
                owner: "Immutable" | {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: number;
                    };
                };
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[] | undefined;
            unwrapped?: {
                owner: "Immutable" | {
                    AddressOwner: string;
                } | {
                    ObjectOwner: string;
                } | {
                    Shared: {
                        initial_shared_version: number;
                    };
                };
                reference: {
                    objectId: string;
                    version: string | number;
                    digest: string;
                };
            }[] | undefined;
            deleted?: {
                objectId: string;
                version: string | number;
                digest: string;
            }[] | undefined;
            unwrapped_then_deleted?: {
                objectId: string;
                version: string | number;
                digest: string;
            }[] | undefined;
            wrapped?: {
                objectId: string;
                version: string | number;
                digest: string;
            }[] | undefined;
            eventsDigest?: string | undefined;
            dependencies?: string[] | undefined;
        } | undefined;
        events?: {
            id: {
                txDigest: string;
                eventSeq: string;
            };
            packageId: string;
            transactionModule: string;
            sender: string;
            type: string;
            parsedJson?: Record<string, any> | undefined;
            bcs?: string | undefined;
            timestampMs?: string | undefined;
        }[] | undefined;
        checkpoint?: string | undefined;
        confirmedLocalExecution?: boolean | undefined;
        objectChanges?: ({
            packageId: string;
            type: "published";
            version: string;
            digest: string;
            modules: string[];
        } | {
            sender: string;
            type: "transferred";
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            recipient: "Immutable" | {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: number;
                };
            };
        } | {
            sender: string;
            type: "mutated";
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: "Immutable" | {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: number;
                };
            };
            previousVersion: string;
        } | {
            sender: string;
            type: "deleted";
            objectType: string;
            objectId: string;
            version: string;
        } | {
            sender: string;
            type: "wrapped";
            objectType: string;
            objectId: string;
            version: string;
        } | {
            sender: string;
            type: "created";
            objectType: string;
            objectId: string;
            version: string;
            digest: string;
            owner: "Immutable" | {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: number;
                };
            };
        })[] | undefined;
        balanceChanges?: {
            owner: "Immutable" | {
                AddressOwner: string;
            } | {
                ObjectOwner: string;
            } | {
                Shared: {
                    initial_shared_version: number;
                };
            };
            coinType: string;
            amount: string;
        }[] | undefined;
        errors?: string[] | undefined;
    }>;
    preapprove: ({ signer, preapproval }: PreapprovalArgs) => Promise<any>;
    showWallet: (signer: Signer) => void;
    hideWallet: (signer: Signer) => void;
    showSignInModal: typeof showSignInModal;
    hideSignInModal: typeof hideSignInModal;
    useProviderAndSigner: () => ProviderAndSigner;
    useAddress: () => string | undefined;
    useContents: () => WalletContents | undefined;
    useWallet: () => WalletContextContents;
    useContext: ({ configuration, onWalletConnected }: UseContextArgs) => ConnectContextContents;
    getWalletContents: ({ address, network, existingContents }: GetWalletContentsArgs) => Promise<WalletContents | null>;
    dripSui: ({ address, network, faucet }: {
        address: string;
        network?: string | undefined;
        faucet?: string | undefined;
    }) => Promise<{
        error: string | null;
        transferredGasObjects: {
            id: string;
            amount: number;
            transferTxDigest: string;
        }[];
    }>;
    getSuiName: (address: string, network: string, sender?: string) => Promise<string>;
    getSuiAddress: (domain: string, network: string, sender?: string) => Promise<string>;
    formatBalance: (balance?: string | number | bigint | undefined, decimals?: number) => string;
    truncateMiddle: (text: string, length?: number) => string;
    ipfsConversion: (src?: string | undefined) => string;
    components: {
        AddressWidget: ({ includeMenu, buttonColor, extraButtons, excludeButtons, externalContext }: AddressWidgetProps) => JSX.Element;
        MenuButton: (props: HoverColorButtonProps) => JSX.Element;
        headless: {
            HoverColorButton: (props: HoverColorButtonProps) => JSX.Element;
        };
    };
    enums: {
        AddressWidgetButtons: typeof AddressWidgetButtons;
    };
};

export { Chain, DetachedEthosConnectProvider, EthosConnectProvider, EthosConnectStatus, ProviderAndSigner, SignInButton, Signer, SuiNFT, Token, Wallet, WalletContents, ethos };
