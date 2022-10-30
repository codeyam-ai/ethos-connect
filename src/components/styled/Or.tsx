import React from 'react'
import * as styles from './signInModalStyles'

const Or = () => {
    return (
        <div style={styles.strikeThroughOrContainer()}>
            <div style={styles.strikeThroughOr()}>
                or
            </div>
        </div>
    )
}

export default Or;