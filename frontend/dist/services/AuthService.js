const API_URL = "http://localhost:3000";
export default class AuthService {
    static async login(email, password) {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const result = await res.json();
        if (!result.success) {
            throw new Error(result.message || "Login failed");
        }
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        return result;
    }
    static async register(data) {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        if (!result.success) {
            throw new Error(result.message || "Registration failed");
        }
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        return result;
    }
    static logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    static getUser() {
        const data = localStorage.getItem("user");
        return data ? JSON.parse(data) : null;
    }
    static isLoggedIn() {
        return !!localStorage.getItem("token");
    }
}
