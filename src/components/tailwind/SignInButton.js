import React from 'react';
import Button from '../headless/Button';
import SignInModal from './SignInModal';

const SignInButton = (props) => {
  const { appId, children, onClick, onSignIn, ...reactProps } = props;

  const [isOpen, setIsOpen] = React.useState(false);

  const _onClick = (e) => {
    setIsOpen(true);

    if (onClick) {
      onClick(e);
    }
  }

  return (
    <>
      <SignInModal 
        appId={appId}
        isOpen={isOpen} 
        onSignIn={onSignIn}
        onClose={() => setIsOpen(false)} 
      />
      <Button
        onClick={_onClick}
        isWorking={isOpen}
        {...reactProps}
      >
        {props.children || <>Sign In</>}
      </Button>

    </>
  )
}
export default SignInButton;