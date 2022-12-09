import React, { useCallback } from 'react';
import MenuButton from './MenuButton';
import type { MenuButtonProps } from '../../types/MenuButtonProps';

import useWallet from '../../hooks/useWallet';

const LogoutButton = (props: MenuButtonProps) => {
    const { externalContext, ...buttonProps } = props;
    const { wallet } = externalContext?.wallet || useWallet();

    const children = useCallback((hover: boolean) => (
        <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M13.5 21V20.25V21ZM7.5 21V21.75V21ZM5.25 18.75H6H5.25ZM5.25 5.25H4.5H5.25ZM7.5 3V2.25V3ZM13.5 3V3.75V3ZM15.75 5.25L15 5.25V5.25H15.75ZM15 9C15 9.41421 15.3358 9.75 15.75 9.75C16.1642 9.75 16.5 9.41421 16.5 9H15ZM16.5 15C16.5 14.5858 16.1642 14.25 15.75 14.25C15.3358 14.25 15 14.5858 15 15H16.5ZM15.75 18.75H16.5H15.75ZM18.2197 14.4697C17.9268 14.7626 17.9268 15.2374 18.2197 15.5303C18.5126 15.8232 18.9874 15.8232 19.2803 15.5303L18.2197 14.4697ZM21.75 12L22.2803 12.5303C22.5732 12.2374 22.5732 11.7626 22.2803 11.4697L21.75 12ZM19.2803 8.46967C18.9874 8.17678 18.5126 8.17678 18.2197 8.46967C17.9268 8.76256 17.9268 9.23744 18.2197 9.53033L19.2803 8.46967ZM9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75V11.25ZM13.5 20.25H7.5V21.75H13.5V20.25ZM6 18.75L6 5.25H4.5L4.5 18.75H6ZM7.5 3.75L13.5 3.75V2.25L7.5 2.25V3.75ZM15 5.25V9H16.5V5.25H15ZM15 15V18.75H16.5V15H15ZM6 5.25C6 4.42157 6.67157 3.75 7.5 3.75V2.25C5.84315 2.25 4.5 3.59315 4.5 5.25H6ZM7.5 20.25C6.67157 20.25 6 19.5784 6 18.75H4.5C4.5 20.4069 5.84315 21.75 7.5 21.75V20.25ZM13.5 21.75C15.1569 21.75 16.5 20.4069 16.5 18.75H15C15 19.5784 14.3284 20.25 13.5 20.25V21.75ZM13.5 3.75C14.3284 3.75 15 4.42157 15 5.25L16.5 5.25C16.5 3.59315 15.1569 2.25 13.5 2.25V3.75ZM19.2803 15.5303L22.2803 12.5303L21.2197 11.4697L18.2197 14.4697L19.2803 15.5303ZM22.2803 11.4697L19.2803 8.46967L18.2197 9.53033L21.2197 12.5303L22.2803 11.4697ZM21.75 11.25L9 11.25V12.75L21.75 12.75V11.25Z" 
                    fill={hover ? 'white' : 'black'}
                />
            </svg>  
            Log Out
        </>
    ), []);

    return (
        <MenuButton 
            {...buttonProps}
            onClick={wallet?.disconnect}
            hoverChildren={children(true)}
        >
            { children(false) }
        </MenuButton>
    )
}

export default LogoutButton;