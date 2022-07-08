import React from 'react';
import { create, act } from 'react-test-renderer';

import SignInModal from '../../../src/components/styled/SignInModal';

const modalExists = ({ root, hidden }: { root: any, hidden: boolean }) => {
  const modals = root.findAll(
    (node) => {
      const style = node.props.style || {};
      return style.opacity === (hidden ? 0 : 1) && 
             parseInt(style.left || 0) * (hidden ? -1 : 1) > 0
    }
  );
  return modals.length > 0
}

describe("SignInModal", () => {
  it('renders a hidden modal if isOpen is false', () => {
    const signInModal = create(
      <SignInModal isOpen={false} />
    )

    const root = signInModal.root;
    expect(modalExists({ root, hidden: true })).toBeTruthy()
    expect(modalExists({ root, hidden: false })).toBeFalsy()
    
    expect(signInModal.toJSON()).toMatchSnapshot()
  });

  it('renders a visible modal if isOpen is true', () => {
    const signInModal = create(
      <SignInModal isOpen={true} />
    )

    const root = signInModal.root;
    expect(modalExists({ root, hidden: false })).toBeTruthy()
    expect(modalExists({ root, hidden: true })).toBeFalsy()
    expect(signInModal.toJSON()).toMatchSnapshot()
  });
});