import * as React from 'react';

const FontProvider = ({ children }: React.HTMLAttributes<HTMLButtonElement>) => {
    const styles = () => (
        {
            fontFamily: "'Inter', sans-serif",
            color: 'black',
            lineHeight: '1.5',
            fontSize: '16px'
        } as React.CSSProperties
    )
    return (
        <>
            <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
            <div style={styles()}>
                {children}
            </div>
        </>
    );
}

export default FontProvider;