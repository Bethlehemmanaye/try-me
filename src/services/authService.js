import jwtDecode from "jwt-decode";
import { setJwt } from "store/middleware/api";

const tokenKey = "token";
const userKey = "user";

setJwt(getJwt());
export async function login(response) {
  const { token, user } = response;
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
}
export function loginWithJwt(response) {
  const { token, user } = response;
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
}
export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    // return JSON.parse(localStorage.getItem(userKey));
    return jwtDecode(jwt);
  } catch (ex) {}
}

export function updateCurrentUser(user) {
  console.log(user, "updateCurrentUser");
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  updateCurrentUser
};
