import React from 'react';
import { create, act } from 'react-test-renderer';

import EthosWrapper from '../../src/components/EthosWrapper';

describe("EthosWrapper", () => {
  it('renders nothing but the children provided', () => {
    const rendered = create(
      <EthosWrapper
        ethosConfiguration={{}}
        onProviderSelected={jest.fn()}
      >
        test
      </EthosWrapper>
    ).toJSON()

    expect(rendered).toMatchSnapshot()
  });
});