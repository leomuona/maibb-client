import { jwtDecode } from "jwt-decode";

// known risk: storing token in localStorage is vulnerable to XSS
const tokenKey = "maibb.token";

export function getToken(): string | null {
  const token = window.localStorage.getItem(tokenKey);
  if (!token) {
    return null;
  }
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp && Date.now() < decoded.exp * 1000) {
      return token;
    }
  } catch (_err) {
    // empty
  }
  // remove expired token
  window.localStorage.removeItem(tokenKey);
  return null;
}

export function setToken(token: string) {
  window.localStorage.setItem(tokenKey, token);
}

export function clearToken() {
  window.localStorage.removeItem(tokenKey);
}
