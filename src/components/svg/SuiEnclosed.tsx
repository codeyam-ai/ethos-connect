import React from 'react'

const SuiEnclosed = ({ width=30 }: { width?: number }) => {
    return (
        <svg width={width} height={width} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_514_2706)">
        <rect x="12" y="8" width="32" height="32" rx="8" fill="#81BAEB" shape-rendering="crispEdges"/>
        <g clip-path="url(#clip0_514_2706)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4933 30.2659C23.0636 31.2776 23.8926 32.1195 24.8954 32.7053C25.8982 33.2912 27.0386 33.5999 28.2 33.5999C29.3614 33.5999 30.5019 33.2912 31.5046 32.7053C32.5074 32.1195 33.3364 31.2776 33.9067 30.2659C34.4919 29.2523 34.8 28.1025 34.8 26.932C34.8 25.7616 34.4919 24.6118 33.9067 23.5982L28.8876 14.8015C28.8188 14.6797 28.719 14.5782 28.5981 14.5077C28.4773 14.4371 28.3399 14.3999 28.2 14.3999C28.0601 14.3999 27.9227 14.4371 27.8019 14.5077C27.6811 14.5782 27.5812 14.6797 27.5125 14.8015L22.4933 23.5982C21.9081 24.6118 21.6 25.7616 21.6 26.932C21.6 28.1025 21.9081 29.2523 22.4933 30.2659ZM26.7861 18.9865L27.8562 17.1109C27.8906 17.05 27.9405 16.9993 28.0009 16.964C28.0613 16.9287 28.1301 16.9101 28.2 16.9101C28.27 16.9101 28.3387 16.9287 28.3991 16.964C28.4595 16.9993 28.5094 17.05 28.5438 17.1109L32.6607 24.3263C33.0302 24.966 33.2593 25.6771 33.3328 26.4123C33.4062 27.1475 33.3223 27.8898 33.0866 28.59C33.0353 28.3514 32.9649 28.1172 32.8759 27.8899C32.3073 26.4377 31.0215 25.3171 29.0535 24.559C27.7006 24.0397 26.8369 23.276 26.486 22.2886C26.034 21.0166 26.5061 19.6291 26.7861 18.9865ZM24.9614 22.1847L23.7394 24.3263C23.2819 25.1186 23.041 26.0174 23.041 26.9323C23.041 27.8472 23.2819 28.7459 23.7394 29.5382C24.1092 30.1934 24.6187 30.7591 25.2318 31.1952C25.8448 31.6312 26.5463 31.927 27.2865 32.0615C28.0268 32.1959 28.7875 32.1658 29.5147 31.9732C30.242 31.7806 30.9179 31.4302 31.4945 30.947C31.8132 30.1324 31.8246 29.2296 31.5266 28.4072C31.109 27.358 30.1035 26.5204 28.5385 25.9172C26.7693 25.2381 25.6201 24.178 25.1229 22.7672C25.056 22.5769 25.002 22.3823 24.9614 22.1847Z" fill="white"/>
        </g>
        </g>
        <defs>
        <filter id="filter0_d_514_2706" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="6"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_514_2706"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_514_2706" result="shape"/>
        </filter>
        <clipPath id="clip0_514_2706">
        <rect width="19.2" height="19.2" fill="white" transform="translate(18.4 14.3999)"/>
        </clipPath>
        </defs>
        </svg>

    )
}

export default SuiEnclosed;