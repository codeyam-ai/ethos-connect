import React from 'react'
import WorkingButton from '../headless/WorkingButton'
import { WorkingButtonProps } from '../../types/WorkingButtonProps'
import useModal from '../../hooks/useModal'

export interface SignInButtonProps extends WorkingButtonProps {
  onLoaded?: () => void
}

const SignInButton = (props: SignInButtonProps) => {
  const { children, onClick, ...reactProps } = props
  const { openModal } = useModal()

  const _onClick = (e: any) => {
    openModal()
    onClick && onClick(e)
  }

  return (
    <>
      <WorkingButton onClick={_onClick} {...reactProps} style={buttonDefault()}>
        {children || <>Sign In</>}
      </WorkingButton>
    </>
  )
}
export default SignInButton

export const buttonDefault = () => (
  {
    lineHeight: '21px',
    padding: '0 12px 0 0',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '14px'
  } as React.CSSProperties
)
