/**
 * @jest-environment jsdom
 */

import store from 'store2'
import { User } from '../../src/types/User'
import lib from '../../src/lib/lib'
import login from '../../src/lib/login'

describe('login', () => {
  let spyPostMessage: jest.SpyInstance
  let actualUser: User
  const email = 'test@t.co'
  const apiKey = '123abc'
  const wallet = '0x0'
  const expectedUser: User = { email, wallet }

  const postIFrameMessageReturn = {
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
    spyPostMessage = jest.spyOn(lib, 'postIFrameMessage').mockReturnValue()

    actualUser = await login({ email, apiKey })
  })

  it('should call the /login endpoint', async () => {
    expect(spyPostMessage).toBeCalledTimes(1)
    expect(spyPostMessage).toBeCalledWith({
      "action": "login",
      "data": {
        email,
        apiKey,
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
