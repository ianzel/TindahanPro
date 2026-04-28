import { post } from "../api.js";

export class AuthService {

  static login(username: string, password: string) {
    return post("/auth/login", { username, password }).then(data => {
      localStorage.setItem("tp_user", JSON.stringify(data));
      localStorage.setItem("tp_logged_in", "true");
      return data;
    });
  }

  static async register(name: string, email: string, password: string) {
  return fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
}

  static logout() {
    localStorage.removeItem("tp_user");
    localStorage.removeItem("tp_logged_in");
  }

  static isLoggedIn() {
    return localStorage.getItem("tp_logged_in") === "true";
  }
}