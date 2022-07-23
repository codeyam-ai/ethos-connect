import Loader from '../svg/Loader'
import React from 'react'

const Button = (props: any) => {
  const { children, onClick, isWorking, workingComponent, ...reactProps } = props

  return (
    <button onClick={onClick} {...reactProps}>
      {isWorking ? (
        workingComponent || (
          <span className="block p-2">
            <Loader width={30} />
          </span>
        )
      ) : (
        <>{children}</>
      )}
    </button>
  )
}
export default Button
