import React, { ReactNode } from 'react'
import * as styles from './signInModalStyles'

export type ModalWrapperProps = {
    closeOnClickId: string,
    onClose: () => void,
    isOpenAll: boolean,
    width: number,
    back: (() => void) | null,
    children: ReactNode
}

const ModalWrapper = ({ closeOnClickId, onClose, isOpenAll, width, back, children }: ModalWrapperProps) => {
    return (
        <div style={styles.modalOuterWrapper(isOpenAll)}>
            <div id={closeOnClickId} style={styles.modalInnerWrapper(width)}>
                <div style={styles.dialogPanel(width)}>
                    <div style={{ height: '36px' }}>
                        {back && (
                            <span style={styles.backStyle()} onClick={back}>
                                ←
                                <span style={styles.backStyleText()}>Back</span>
                            </span>
                        )}
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