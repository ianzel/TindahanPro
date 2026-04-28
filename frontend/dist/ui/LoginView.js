import { AuthService } from "../services/AuthService.js";
export function renderLogin(onSuccess, goRegister) {
    const root = document.getElementById("login-screen");
    root.innerHTML = `
    <div class="auth-wrapper">
      <div class="auth-card">

        <h2>TindahanPro</h2>
        <p class="subtitle">
          Smart Sari-Sari Store Management System.<br/>
          Track products, sales, and profits easily.
        </p>

        <div class="input-group">
          <label>Email</label>
          <input id="login-email" type="email" placeholder="Enter your email" />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input id="login-password" type="password" placeholder="Enter password" />
        </div>

        <button class="auth-btn" id="login-btn">Login</button>

        <p class="switch-text">
          Don't have an account?
          <span id="go-register">Register</span>
        </p>

        <p id="login-error" class="auth-error"></p>

      </div>
    </div>
  `;
    document.getElementById("go-register").onclick = goRegister;
    document.getElementById("login-btn").onclick = async () => {
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        try {
            await AuthService.login(email, password);
            onSuccess();
        }
        catch (err) {
            document.getElementById("login-error").textContent = "Invalid credentials";
        }
    };
}
