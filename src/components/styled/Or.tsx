import React from 'react'
import * as styles from './signInModalStyles'

const Or = () => {
    return (
        <div style={styles.strikeThroughOrContainer()}>
            <div style={styles.line()} />
                or
            <div style={styles.line()} />
        </div>
    )
}

export default Or;