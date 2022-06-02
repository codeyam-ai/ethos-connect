import store from "store2";
import apiCall from "./apiCall";

const login = async (email, appId) => {
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