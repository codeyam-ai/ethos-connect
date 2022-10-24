import React, { HTMLAttributes, ReactNode } from "react";
import * as styles from './signInModalStyles'

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    text: string,
    icon: ReactNode,
    width: number
}

const IconButton = (props: IconButtonProps) => {
    const { text, icon, width, ...reactProps } = props;
    return (
        <button
            style={styles.iconButton(width)}
            {...reactProps}
        >   
            {icon}
            <span style={styles.iconButtonText()}>
                {text}
            </span>
        </button>
    )
}

export default IconButton;