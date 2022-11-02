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
                    <div style={styles.topPanelStyle()}>
                        <span>
                            {back && (
                                <span style={styles.backStyle()} onClick={back}>
                                    ←
                                    <span style={styles.backStyleText()}>Back</span>
                                </span>
                            )}
                        </span>
                        <span style={styles.closeStyle()} onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </span>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalWrapper;