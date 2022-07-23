import React from 'react'
import Button from '../headless/Button'
import SignInModal from './SignInModal'

export interface SignInButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  onLoaded?: () => void
  onEmailSent?: () => void
}

const SignInButton = (props: SignInButtonProps) => {
  const { children, onClick, onEmailSent, ...reactProps } = props

  const [isOpen, setIsOpen] = React.useState(false)

  const _onClick = () => {
    setIsOpen(true)

    onClick && onClick()
  }

  return (
    <>
      <SignInModal isOpen={isOpen} onEmailSent={onEmailSent} onClose={() => setIsOpen(false)} />
      <Button onClick={_onClick} {...reactProps}>
        {children || <>Sign In</>}
      </Button>
    </>
  )
}
export default SignInButton
