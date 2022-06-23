import React from 'react'
import Button from '../headless/Button'
import SignInModal from './SignInModal'

const SignInButton = (props: any) => {
  const { appId, children, onClick, onSignIn, ...reactProps } = props

  const [isOpen, setIsOpen] = React.useState(false)

  const _onClick = (e: any) => {
    setIsOpen(true)

    if (onClick) {
      onClick(e)
    }
  }

  return (
    <>
      <SignInModal
        isOpen={isOpen}
        setSigner={onSignIn}
        setProvider={() => {}}
        onClose={() => setIsOpen(false)}
      />
      <Button onClick={_onClick} isWorking={isOpen} {...reactProps}>
        {props.children || <>Sign In</>}
      </Button>
    </>
  )
}
export default SignInButton
