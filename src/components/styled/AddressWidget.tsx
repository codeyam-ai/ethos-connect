
import React, { ReactNode, useCallback, useState } from 'react';

import SignInButton from './SignInButton';
import HoverColorButton from '../headless/HoverColorButton';

import useWallet from '../../hooks/useWallet';
import formatBalance from '../../lib/formatBalance';
import truncateMiddle from '../../lib/truncateMiddle';

import Sui from "../svg/Sui";
import CopyWalletAddressButton from './CopyWalletAddressButton';

export interface AddressWidgetProps {
    includeMenu: boolean,
    buttonColor?: string,
    extraButtons: ReactNode[]
}

const AddressWidget = ({ includeMenu = true, buttonColor = "#6f53e4", extraButtons = [] }: AddressWidgetProps) => {
    const { wallet } = useWallet();
    const [showMenu, setShowMenu] = useState(false);
    console.log("WALLET", wallet)

    const onMouseEnter = useCallback(() => {
        if (!wallet) return;

        setShowMenu(true);
    }, [wallet])

    const onMouseLeave = useCallback(() => {
        if (!wallet) return;

        setShowMenu(false);
    }, [wallet])

    const hoverButton = useCallback((children: ReactNode, hoverChildren: ReactNode) => {
        return (
            <HoverColorButton 
                style={button()}
                hoverBackgroundColor={buttonColor} 
                hoverChildren={hoverChildren}
            >
                { children }
            </HoverColorButton>
        )
    }, []);

    const logOutButton = useCallback((hover: boolean) => (
        <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M12 21C16.1926 21 19.7156 18.1332 20.7157 14.2529M12 21C7.80742 21 4.28442 18.1332 3.2843 14.2529M12 21C14.4853 21 16.5 16.9706 16.5 12C16.5 7.02944 14.4853 3 12 3M12 21C9.51472 21 7.5 16.9706 7.5 12C7.5 7.02944 9.51472 3 12 3M12 3C15.3652 3 18.299 4.84694 19.8431 7.58245M12 3C8.63481 3 5.70099 4.84694 4.15692 7.58245M19.8431 7.58245C17.7397 9.40039 14.9983 10.5 12 10.5C9.00172 10.5 6.26027 9.40039 4.15692 7.58245M19.8431 7.58245C20.5797 8.88743 21 10.3946 21 12C21 12.778 20.9013 13.5329 20.7157 14.2529M20.7157 14.2529C18.1334 15.6847 15.1619 16.5 12 16.5C8.8381 16.5 5.86662 15.6847 3.2843 14.2529M3.2843 14.2529C3.09871 13.5329 3 12.778 3 12C3 10.3946 3.42032 8.88743 4.15692 7.58245" 
                    stroke={hover ? 'white' : 'black'} 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg> 
            Log Out
        </>
    ), []);

    const walletExplorerButton = useCallback((hover: boolean) => (
        <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M12 21C16.1926 21 19.7156 18.1332 20.7157 14.2529M12 21C7.80742 21 4.28442 18.1332 3.2843 14.2529M12 21C14.4853 21 16.5 16.9706 16.5 12C16.5 7.02944 14.4853 3 12 3M12 21C9.51472 21 7.5 16.9706 7.5 12C7.5 7.02944 9.51472 3 12 3M12 3C15.3652 3 18.299 4.84694 19.8431 7.58245M12 3C8.63481 3 5.70099 4.84694 4.15692 7.58245M19.8431 7.58245C17.7397 9.40039 14.9983 10.5 12 10.5C9.00172 10.5 6.26027 9.40039 4.15692 7.58245M19.8431 7.58245C20.5797 8.88743 21 10.3946 21 12C21 12.778 20.9013 13.5329 20.7157 14.2529M20.7157 14.2529C18.1334 15.6847 15.1619 16.5 12 16.5C8.8381 16.5 5.86662 15.6847 3.2843 14.2529M3.2843 14.2529C3.09871 13.5329 3 12.778 3 12C3 10.3946 3.42032 8.88743 4.15692 7.58245" 
                    stroke={hover ? 'white' : 'black'} 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                />
            </svg> 
            Wallet Explorer
        </>
    ), []);

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
                    {hoverButton(
                        walletExplorerButton(false), 
                        walletExplorerButton(true)
                    )}
                    {extraButtons}
                    {hoverButton(
                        logOutButton(false), 
                        logOutButton(true)
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

