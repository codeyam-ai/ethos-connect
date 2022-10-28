import Ethos from '../svg/Ethos'
import React, { ReactNode } from 'react'
import * as styles from './signInModalStyles'

export type HeaderProps = {
    title?: string | ReactNode,
    subTitle?: string | ReactNode,
    dappIcon?: string | ReactNode,
    showEthos?: boolean,
    children: ReactNode
}

const Header = ({ title, subTitle, dappIcon, showEthos=false, children }: HeaderProps) => {
    return (
        <div>
            <div style={styles.headerStyle()}>
                <div style={styles.headerLogosStyle()}>
                    {dappIcon && (
                        typeof dappIcon === 'string' ? <img src={dappIcon} /> : dappIcon
                    )}
                    {showEthos && (<Ethos />)}
                    
                </div>
                {title && (
                    <div style={styles.titleStyle()}>
                        {title}
                    </div>
                )}
                {subTitle && (
                    <div style={styles.subTitleStyle()}>
                        {subTitle}
                    </div>
                )}
            </div>
            {children}
        </div>
    )
}

export default Header;