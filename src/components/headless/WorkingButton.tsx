import React from 'react'
import { WorkingButtonProps } from '../../types/WorkingButtonProps'

import Loader from '../svg/Loader'

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
