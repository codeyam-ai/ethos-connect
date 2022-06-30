import React from 'react'
import Button from '../headless/Button'
import SignInModal, { ProviderAndSigner } from './SignInModal'

export interface SignInButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  appId: string
  onClick?: () => void
  onLoaded?: () => void
  onEmailSent?: () => void
  onProviderSelected: ({ provider, signer }: ProviderAndSigner) => void
  showWhileLoading?: boolean
  workingComponent?: React.ReactElement
}

const SignInButton = (props: SignInButtonProps) => {
  const {
    appId,
    children,
    onClick,
    onLoaded,
    onEmailSent,
    onProviderSelected,
    showWhileLoading = true,
    workingComponent,
    ...reactProps
  } = props

  const [isOpen, setIsOpen] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)

  const _onClick = () => {
    setIsOpen(true)

    onClick && onClick()
  }

  const _onLoaded = () => {
    setLoaded(true)
    onLoaded && onLoaded()
  }

  return (
    <>
      <SignInModal
        isOpen={isOpen}
        onLoaded={_onLoaded}
        onEmailSent={onEmailSent}
        onProviderSelected={onProviderSelected}
        onClose={() => setIsOpen(false)}
      />
      {(showWhileLoading || loaded) && (
        <Button
          onClick={_onClick}
          isWorking={!loaded || isOpen}
          workingComponent={workingComponent}
          {...reactProps}
        >
          {children || <>Sign In</>}
        </Button>
      )}
    </>
  )
}
export default SignInButton
