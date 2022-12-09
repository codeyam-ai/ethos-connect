import React, { useCallback } from 'react'
import WorkingButton from '../headless/WorkingButton'
import { WorkingButtonProps } from '../../types/WorkingButtonProps'
import useModal from '../../hooks/useModal'

export interface SignInButtonProps extends WorkingButtonProps {
  onLoaded?: () => void
  externalContext?: any
}

const SignInButton = (props: SignInButtonProps) => {
  const { children, onClick, externalContext, ...reactProps } = props
  const { openModal } = externalContext?.modal || useModal();

  const _onClick = useCallback((e: any) => {
    openModal()
    onClick && onClick(e)
  }, [openModal, onClick])

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
