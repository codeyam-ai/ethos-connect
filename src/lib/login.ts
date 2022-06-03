import store from "store2";
import { User } from "../types/User";
import apiCall from "./apiCall";

const login = async (email: string, appId: string): Promise<User> => {
  const userStore = store.namespace('users');

  const { json: { user } } = await apiCall({
    relativePath: "users/login",
    method: "POST",
    body: { 
      email, 
      appId,
      returnTo: window.location.href
    }
  })

  userStore('current', user)
  return user;
}

export default login;