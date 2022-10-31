import React, { HTMLAttributes, ReactNode } from "react";
import * as styles from './signInModalStyles'

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
    text: string,
    icon?: ReactNode,
    width: number,
    primary?: boolean
}

const IconButton = (props: IconButtonProps) => {
    const { text, icon, width, primary, ...reactProps } = props;
    return (
        <button
            style={styles.iconButton(width, primary, !icon)}
            {...reactProps}
        >   
            <div>
                {text}
            </div>
            {icon}
        </button>
    )
}

export default IconButton;