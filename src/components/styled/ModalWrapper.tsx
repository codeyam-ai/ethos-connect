import React, { ReactNode } from 'react'
import * as styles from './signInModalStyles'

export type ModalWrapperProps = {
    closeOnClickId: string,
    onClose: () => void,
    isOpenAll: boolean,
    width: number,
    children: ReactNode
}

const ModalWrapper = ({ closeOnClickId, onClose, isOpenAll, width, children }: ModalWrapperProps) => {
    return (
        <div style={styles.modalOuterWrapper(isOpenAll)}>
            <div id={closeOnClickId} style={styles.modalInnerWrapper(width)}>
                <div style={styles.dialogPanel(width)}>
                    <div style={{ height: '36px' }}>
                        <span style={styles.closeStyle()} onClick={onClose}>
                        &#x2715;
                        </span>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalWrapper;