
import React, { ReactNode, useCallback, useState } from 'react';

import SignInButton from './SignInButton';

import useWallet from '../../hooks/useWallet';
import formatBalance from '../../lib/formatBalance';
import truncateMiddle from '../../lib/truncateMiddle';

import Sui from "../svg/Sui";
import CopyWalletAddressButton from './CopyWalletAddressButton';
import WalletExplorerButton from './WalletExplorerButton';
import LogoutButton from './LogoutButton';
import { primaryColor } from '../../lib/constants';
import { useEffect } from 'react';
import { AddressWidgetButtons } from '../../enums/AddressWidgetButtons';

export interface AddressWidgetProps {
    includeMenu?: boolean
    buttonColor?: string
    extraButtons?: ReactNode[]
    excludeButtons?: AddressWidgetButtons[]
    externalContext?: any
}

const AddressWidget = ({ 
    includeMenu = true, 
    buttonColor = primaryColor,
    extraButtons = [],
    excludeButtons = [],
    externalContext 
}: AddressWidgetProps) => {
    const { wallet } = externalContext?.wallet || useWallet();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!wallet) {
            setShowMenu(false);
        }
    }, [wallet])

    const onMouseEnter = useCallback(() => {
        if (!wallet) return;

        setShowMenu(true);
    }, [wallet])

    const onMouseLeave = useCallback(() => {
        if (!wallet) return;

        setShowMenu(false);
    }, [wallet])

    return (
        <div style={container()} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div style={primary()}>
                <div>
                    <Sui color="#222532" width={12} />
                </div>
                {wallet ? (
                    <>
                        <div>
                            {formatBalance(wallet.contents?.suiBalance)}{' '}
                            Sui
                        </div>
                        <div style={address()}>
                            {wallet.icon && (
                                <img 
                                    style={walletIcon()}
                                    src={wallet.icon}
                                />
                            )}
                            {truncateMiddle(wallet.address)}
                        </div>
                    </>
                ) : (
                    <SignInButton style={signIn()} externalContext={externalContext} />
                )}
            </div>
            {includeMenu && showMenu && (
                <div style={menu()}>
                    {!excludeButtons.includes(AddressWidgetButtons.CopyWalletAddress) && (
                        <CopyWalletAddressButton 
                            externalContext={externalContext}
                            hoverBackgroundColor={buttonColor} 
                        />
                    )}
                    
                    {!excludeButtons.includes(AddressWidgetButtons.WalletExplorer) && (
                        <WalletExplorerButton
                            hoverBackgroundColor={buttonColor} 
                        />
                    )}
                    {extraButtons}
                    {!excludeButtons.includes(AddressWidgetButtons.Logout) && (
                        <LogoutButton
                            externalContext={externalContext}
                            hoverBackgroundColor={buttonColor}
                        />
                    )}
                </div>
            )}

        </div>
    )
}

export default AddressWidget;

export const container = () => (
    {
        position: "relative",
        backgroundColor: 'white',
        padding: "6px 12px 6px 18px",
        boxShadow: "1px 1px 3px 1px #dfdfe0",
        borderRadius: '18px',
        fontSize: '14px',
    } as React.CSSProperties
)

export const primary = () => (
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
    } as React.CSSProperties
)

export const address = () => (
    {
        borderRadius: "30px",
        backgroundColor: "#f2f1f0",
        padding: "6px 12px",
        display: "flex",
        alignItems: "center",
        gap: "6px"
    } as React.CSSProperties
)

export const menu = () => (
    {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        padding: "12px 18px",
        position: "absolute",
        bottom: 0,
        left: "12px",
        right: "12px",
        transform: "translateY(100%)",
        boxShadow: "1px 1px 3px 1px #dfdfe0",
        borderBottomLeftRadius: '18px',
        borderBottomRightRadius: '18px',
        backgroundColor: 'white',
        zIndex: "99"
    } as React.CSSProperties
)

export const signIn = () => (
    {  
        padding: "0 12px 0 0",
        background: "none",
        whiteSpace: "nowrap"
    } as React.CSSProperties
);

export const walletIcon = () => (
    {  
        width: "20px",
        height: "20px"
    } as React.CSSProperties
);

export const svg = () => (
    {
        verticalAlign: 'middle',
        display: 'block'
    }
)

