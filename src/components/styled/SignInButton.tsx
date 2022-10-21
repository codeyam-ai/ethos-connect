import React from 'react'
import Button from '../headless/Button'
import useModal from '../../hooks/useModal'

export interface SignInButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
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
      <Button onClick={_onClick} {...reactProps}>
        {children || <>Sign In</>}
      </Button>
    </>
  )
}
export default SignInButton
