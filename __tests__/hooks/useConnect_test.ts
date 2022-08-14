import { renderHook } from '@testing-library/react-hooks'
import useConnect from '../../src/hooks/useConnect'

describe('useConnect', () => {
  it("should not set the provider until all methods have been checked", () => {
    const { result } = renderHook(() => useConnect())
    const { providerAndSigner } = result.current;
    expect(providerAndSigner.provider).toBeNull()
  })

  it.todo("should set the provider once a provider with a signer is found")

  it.todo("should update the provider externally")
})
