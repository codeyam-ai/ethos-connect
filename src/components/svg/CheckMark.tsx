import React from 'react'

const CheckMark = ({ width = 24, color = '#1e293b' }: { width?: number; color?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={(width * 65) / 47}
        fill="none"
        viewBox="0 0 24 24"
        stroke={color}
        strokeWidth={2}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
        />
    </svg>
)

export default CheckMark
