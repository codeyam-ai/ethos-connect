import SignInButton from '../../../src/components/styled/SignInButton'
import Button from '../../../src/components/headless/Button'

import React from 'react';
import TestRenderer from 'react-test-renderer';

describe("SignInButton", () => {
  it('renders correctly', () => {
    const rendered = TestRenderer.create(
      <SignInButton />
    ).toJSON();
    expect(rendered).toMatchSnapshot()
  });

  it('triggers the SignInModal when clicked and triggers onClick callback', () => {
    const onClick = jest.fn();
    const signInButton = TestRenderer.create(
      <SignInButton 
        onClick={onClick}
      />
    )
    const testInstance = signInButton.root;
    testInstance.findByType(Button).props.onClick();
    expect(signInButton.toJSON()).toMatchSnapshot();
  });
});