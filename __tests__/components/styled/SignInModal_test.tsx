import React from 'react';
import { create, act } from 'react-test-renderer';

import SignInModal from '../../../src/components/styled/SignInModal';

describe("SignInModal", () => {
  it('renders a hidden modal if isOpen is false', () => {
    const signInModal = create(
      <SignInModal isOpen={false} />
    )

    const root = signInModal.root;
    const hiddenModal = root.findAll(
      (node) => {
        const style = node.props.style || {};
        return style.opacity === 0 && parseInt(style.left || 0) < 0
      }
    )
    expect(hiddenModal.length).toBe(1)
    expect(signInModal.toJSON()).toMatchSnapshot()
  });
});