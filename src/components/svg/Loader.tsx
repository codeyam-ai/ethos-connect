import React from 'react';

const Loader = ({ width=100, color="#333" }: { width?: number, color?: string }) => (
  <svg 
    version="1.1"
    id="L4" 
    xmlns="http://www.w3.org/2000/svg" 
    x="0px" 
    y="0px"
    viewBox="0 0 100 100" 
    width={width}
    height={width}
    enable-background="new 0 0 0 0" 
  >
    <circle fill={color} stroke="none" cx="6" cy="50" r="6">
      <animate
        attributeName="opacity"
        dur="1.5s"
        values="0;1;0"
        repeatCount="indefinite"
        begin="0.1"/>    
    </circle>
    <circle fill={color} stroke="none" cx="26" cy="50" r="6">
      <animate
        attributeName="opacity"
        dur="1.5s"
        values="0;1;0"
        repeatCount="indefinite" 
        begin="0.5"/>       
    </circle>
    <circle fill={color} stroke="none" cx="46" cy="50" r="6">
      <animate
        attributeName="opacity"
        dur="1.5s"
        values="0;1;0"
        repeatCount="indefinite" 
        begin="1.0"/>     
    </circle>
  </svg>
);

export default Loader;