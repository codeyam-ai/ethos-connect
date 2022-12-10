import React, { CSSProperties, useCallback } from 'react'
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
      <WorkingButton onClick={_onClick} {...reactProps} style={buttonDefault(props.style)}>
        {children || <>Sign In</>}
      </WorkingButton>
    </>
  )
}
export default SignInButton

export const buttonDefault = (providedStyles: CSSProperties | undefined) => (
  {
    lineHeight: '21px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '14px',
    ...providedStyles || {}
  } as React.CSSProperties
)
