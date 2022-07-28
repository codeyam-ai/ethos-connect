/**
 * @jest-environment jsdom
 */

import store from 'store2'
import { User } from '../../src/types/User'
import * as postMessage from '../../src/lib/postMessage'
import login from '../../src/lib/login'

describe('login', () => {
  let spyPostMessage: jest.SpyInstance
  let actualUser: User
  const email = 'test@t.co'
  const appId = '123abc'
  const wallet = '0x0'
  const expectedUser: User = { email, wallet }

  const postMessageReturn = {
    json: { user: expectedUser },
    status: 200,
  }

  beforeEach(async () => {
    jest.spyOn(window, 'addEventListener').mockImplementation((topic, listener) => {
      expect(topic).toBe('message');
      const listenerFunction = listener as any;
      listenerFunction({
        origin: 'test',
        data: {
          action: 'login',
          data: 'user'
        }
      })
    })
    spyPostMessage = jest.spyOn(postMessage, 'default').mockImplementation(() => {})

    actualUser = await login({ email, appId })
  })

  it('should call the /login endpoint', async () => {
    expect(spyPostMessage).toBeCalledTimes(1)
    expect(spyPostMessage).toBeCalledWith({
      "action": "login",
      "data": {
        email,
        appId,
        returnTo: window.location.href,
        provider: undefined
      }
    })
  })

  it('should save the user to the userStore', async () => {
    const userStore = store.namespace('users')

    expect(actualUser).toEqual(userStore('current'))
  })
})
