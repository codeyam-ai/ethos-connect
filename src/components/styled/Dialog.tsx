import React, { ReactNode } from "react"
import FontProvider from './FontProvider'
import * as styles from './signInModalStyles'

export type DialogProps = {
    isOpenAll: boolean,
    children: ReactNode
}

const Dialog = ({ isOpenAll, children }: DialogProps) => {
    return (
        <FontProvider>
            <div style={styles.dialog(isOpenAll)} role="dialog">
                <div style={styles.backdrop(isOpenAll)} />
                {children}
            </div>
        </FontProvider>
    )
}

export default Dialog;