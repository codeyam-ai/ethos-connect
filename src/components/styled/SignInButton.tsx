import React from 'react'
import WorkingButton, { WorkingButtonProps } from '../headless/WorkingButton'
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
      <WorkingButton onClick={_onClick} {...reactProps}>
        {children || <>Sign In</>}
      </WorkingButton>
    </>
  )
}
export default SignInButton
