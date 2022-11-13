import React, { ButtonHTMLAttributes, ReactNode } from 'react'

import Loader from '../svg/Loader'

export interface WorkingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isWorking?: boolean,
    workingComponent?: ReactNode 
}

const WorkingButton = (props: WorkingButtonProps) => {
    const { children, isWorking, workingComponent, ...reactProps } = props

    return (
        <button {...reactProps}>
            {isWorking ? (
                workingComponent || (
                    <span className="block p-2">
                        <Loader width={32} />
                    </span>
                )
            ) : (
                <>{children}</>
            )}
        </button>
    )
}
export default WorkingButton
