import React, { ReactNode } from 'react'
import * as styles from './signInModalStyles'

export type ModalWrapperProps = {
    closeOnClickId: string,
    isOpenAll: boolean,
    width: number,
    children: ReactNode
}

const ModalWrapper = ({ closeOnClickId, isOpenAll, width, children }: ModalWrapperProps) => {
    return (
        <div style={styles.modalOuterWrapper(isOpenAll)}>
            <div id={closeOnClickId} style={styles.modalInnerWrapper(width)}>
                <div style={styles.dialogPanel(width)}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalWrapper;