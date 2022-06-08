import React from 'react'

const Button = (props: any) => {
  const { children, onClick, isWorking, workingComponent, ...reactProps } = props

  return (
    <button onClick={onClick} {...reactProps}>
      {isWorking ? workingComponent || <>...</> : <h4>{children}</h4>}
    </button>
  )
}
export default Button
