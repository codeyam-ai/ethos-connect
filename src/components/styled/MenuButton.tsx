import React from 'react';
import HoverColorButton, { HoverColorButtonProps } from '../headless/HoverColorButton';

const MenuButton = (props: HoverColorButtonProps) => {
    return (
        <HoverColorButton
            {...props}
            style={button()}
            
        />
    )
}

export default MenuButton;

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