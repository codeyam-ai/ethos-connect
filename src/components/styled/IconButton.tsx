import React, { MouseEventHandler, ReactNode } from "react";
import * as styles from './signInModalStyles'

export type IconButtonProps = {
    text: string,
    icon: ReactNode,
    onClick: MouseEventHandler,
    width: number
}

const IconButton = ({ text, icon, onClick, width }: IconButtonProps) => {
    return (
        <button
            style={styles.iconButton(width)}
            onClick={onClick}
        >   
            {icon}
            <span style={styles.iconButtonText()}>
                {text}
            </span>
        </button>
    )
}

export default IconButton;