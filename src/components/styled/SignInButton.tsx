import React from 'react'
import Button from '../headless/Button'
import SignInModal from './SignInModal'

export interface SignInButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  socialLogin?: string[]
  onLoaded?: () => void
}

const SignInButton = (props: SignInButtonProps) => {
  const { children, socialLogin, ...reactProps } = props

  const [isOpen, setIsOpen] = React.useState(false)

  const onClick = () => {
    setIsOpen(true)
    document.getElementsByTagName("html").item(0)?.setAttribute("style", "overflow: hidden;")
  }

  const onClose = () => {
    document.getElementsByTagName("html").item(0)?.setAttribute("style", "")
    setIsOpen(false)
  }

  return (
    <>
      <SignInModal socialLogin={socialLogin} isOpen={isOpen} onClose={onClose} />
      <Button onClick={onClick} {...reactProps}>
        {children || <>Sign In</>}
      </Button>
    </>
  )
}
export default SignInButton
