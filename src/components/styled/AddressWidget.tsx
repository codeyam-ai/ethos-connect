
import React, { useCallback, useState } from 'react';

import SignInButton from './SignInButton';

import useWallet from '../../hooks/useWallet';
import formatBalance from '../../lib/formatBalance';
import truncateMiddle from '../../lib/truncateMiddle';

import Sui from "../svg/Sui";

export interface AddressWidgetProps {
    buttonColor?: string
}

const AddressWidget = ({ buttonColor = "red" }: AddressWidgetProps) => {
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
                            {formatBalance(wallet.contents?.suiBalance)}
                        </div>
                        <div style={address()}>
                            {truncateMiddle(wallet.address)}
                        </div>
                    </>
                ) : (
                    <SignInButton style={signIn()} />
                )}
            </div>
            {showMenu && (
                <div style={menu()}>
                    <div style={button(buttonColor)}>
                        BUTTON
                    </div>
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
        padding: "6px 6px 6px 18px",
        boxShadow: "1px 1px 3px 1px #dfdfe0",
        borderRadius: '18px',
        fontSize: '15px'

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
        padding: "30px",
        position: "absolute",
        bottom: 0,
        left: 0,
        transform: "translateY(100%)",
        backgroundColor: "white"
    } as React.CSSProperties
)

export const button = (buttonColor: string) => (
    {
        backgroundColor: buttonColor
    } as React.CSSProperties
)

export const signIn = () => (
    {  
        paddingRight: "12px",
        whiteSpace: "nowrap"
    } as React.CSSProperties
);

