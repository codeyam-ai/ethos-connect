/**
 * @jest-environment jsdom
 */

import store from 'store2'
import { User } from '../../types/User'
import * as apiCall from '../apiCall'
import login from '../login'

describe('login', () => {
  let spyApiCall: jest.SpyInstance
  let actualUser: User
  const email = 'test@t.co'
  const appId = '123abc'
  const wallet = '0x0'
  const expectedUser: User = { email, wallet }

  const apiCallReturn = {
    json: { user: expectedUser },
    status: 200,
  }

  beforeEach(async () => {
    spyApiCall = jest.spyOn(apiCall, 'default').mockResolvedValueOnce(apiCallReturn)

    actualUser = await login(email, appId)
  })

  it('should call the /login endpoint', async () => {
    expect(spyApiCall).toBeCalledTimes(1)
    expect(spyApiCall).toBeCalledWith({
      relativePath: 'users/login',
      method: 'POST',
      body: {
        email,
        appId,
        returnTo: window.location.href,
      },
    })
    expect(actualUser).toEqual(apiCallReturn.json.user)
  })

  it('should save the user to the userStore', async () => {
    const userStore = store.namespace('users')

    expect(actualUser).toEqual(userStore('current'))
  })
})
