
import React, { ReactNode, useCallback, useState } from 'react';

import SignInButton from './SignInButton';

import useWallet from '../../hooks/useWallet';
import formatBalance from '../../lib/formatBalance';
import truncateMiddle from '../../lib/truncateMiddle';

import Sui from "../svg/Sui";
import CopyWalletAddressButton from './CopyWalletAddressButton';
import WalletExplorerButton from './LogOutButton';
import LogOutButton from './LogOutButton';

export interface AddressWidgetProps {
    includeMenu: boolean,
    buttonColor?: string,
    extraButtons: ReactNode[]
}

const AddressWidget = ({ includeMenu = true, buttonColor = "#6f53e4", extraButtons = [] }: AddressWidgetProps) => {
    const { wallet } = useWallet();
    const [showMenu, setShowMenu] = useState(false);

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
                            {truncateMiddle(wallet.address)}
                        </div>
                    </>
                ) : (
                    <SignInButton style={signIn()} />
                )}
            </div>
            {includeMenu && showMenu && (
                <div style={menu()}>
                    <CopyWalletAddressButton 
                        style={button()}
                        hoverBackgroundColor={buttonColor} 
                    />
                    <WalletExplorerButton
                        style={button()}
                        hoverBackgroundColor={buttonColor} 
                    />
                    {extraButtons}
                    <LogOutButton
                        style={button()}
                        hoverBackgroundColor={buttonColor}
                    />
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
        padding: "6px 6px 6px 12px",
        boxShadow: "1px 1px 3px 1px #dfdfe0",
        borderRadius: '18px',
        fontSize: '14px'

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
        padding: "6px 12px"
    } as React.CSSProperties
)

export const menu = () => (
    {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        padding: "12px",
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

export const button = () => (
    {
        width: "100%",
        borderRadius: "12px",
        textAlign: 'left',
        padding: "6px 12px",
        display: "flex",
        alignItems: 'center',
        gap: "6px"
    } as React.CSSProperties
)

export const signIn = () => (
    {  
        paddingRight: "12px",
        whiteSpace: "nowrap"
    } as React.CSSProperties
);

