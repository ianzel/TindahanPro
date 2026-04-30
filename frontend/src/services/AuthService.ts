import { post } from "../api.js";

const USER_KEY = "tp_user";
const LOGIN_KEY = "tp_logged_in";

export class AuthService {

  static async login(email: string, password: string) {
    const data = await post("/auth/login", { email, password });

    // IMPORTANT: store full user properly
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    localStorage.setItem(LOGIN_KEY, "true");

    return data;
  }

  static async register(username: string, email: string, password: string) {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    return res.json();
  }

  static logout() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LOGIN_KEY);
  }

  static isLoggedIn() {
    return localStorage.getItem(LOGIN_KEY) === "true"
      && localStorage.getItem(USER_KEY) !== null;
  }

  static getUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}