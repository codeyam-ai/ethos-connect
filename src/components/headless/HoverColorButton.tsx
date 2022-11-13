import React, { ReactNode, useCallback, useState } from "react";
import WorkingButton from "./WorkingButton";
import { WorkingButtonProps } from '../../types/WorkingButtonProps'

export interface HoverColorButtonProps extends WorkingButtonProps {
    hoverBackgroundColor: string
    hoverChildren: ReactNode
}

const HoverColorButton = (props: HoverColorButtonProps) => {
    const { hoverBackgroundColor, hoverChildren, children, style, ...workingButtonProps} = props;
    const [hover, setHover] = useState(false);

    const onMouseEnter = useCallback(() => {
        setHover(true);
    }, [])

    const onMouseLeave = useCallback(() => {
        setHover(false);
    }, [])

    return (
        <WorkingButton
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ 
                ...style,
                backgroundColor: hover ? hoverBackgroundColor : undefined,
                color: hover ? 'white' : 'black'
            }}
            {...workingButtonProps}
        >
            {hover ? hoverChildren : children}
        </WorkingButton>
    )
}

export default HoverColorButton;