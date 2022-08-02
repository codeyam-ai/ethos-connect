import * as ReactApi from '../src/index'
import { EthosWrapper, SignInButton } from '../src/index'

/**
 * Looks a bit of a silly test, however this ensures that we don't accidentally expose something to
 * the outside world that we didn't want!
 */
it('should expose the correct components', () => {
  expect(Object.keys(ReactApi)).toEqual([EthosWrapper.name, SignInButton.name, 'ethos'])
})
