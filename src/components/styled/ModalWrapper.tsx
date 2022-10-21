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
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    height={18} 
                                    width={18} 
                                    strokeWidth="2" 
                                    stroke="currentColor"
                                    aria-hidden="true" 
                                    className="h-5 w-5"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18">
                                    </path>
                                </svg>
                                Back
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