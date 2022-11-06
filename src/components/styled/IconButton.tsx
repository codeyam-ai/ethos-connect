import React, { HTMLAttributes, ReactNode } from "react";
import * as styles from './signInModalStyles'

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    text: string,
    icon?: ReactNode,
    width: number,
    disabled?: boolean,
    primary?: boolean,
    type?: 'button' | 'submit' | 'reset' | undefined;
}

const IconButton = (props: IconButtonProps) => {
    const { text, icon, width, disabled, primary, type, ...reactProps } = props;
    return (
        <button
            style={styles.iconButton(width, disabled, primary, !icon)}
            {...reactProps}
            type={type}
        >   
            <div>
                {text}
            </div>
            {icon}
        </button>
    )
}

export default IconButton;