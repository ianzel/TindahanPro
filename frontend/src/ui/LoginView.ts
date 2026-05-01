import AuthService from "../services/AuthService.js";

export function renderLogin(onSuccess: () => void, goRegister: () => void) {
  const root = document.getElementById("login-screen") as HTMLElement;

  root.innerHTML = `
    <div class="auth-wrapper">
      <div class="auth-card">

        <h2>TindahanPro</h2>

        <div class="input-group">
          <label>Email</label>
          <input id="login-email" type="email" placeholder="Enter email" />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input id="login-password" type="password" placeholder="Enter password" />
        </div>

        <button id="login-btn" class="auth-btn">Login</button>

        <p class="switch-text">
          Don't have an account?
          <span id="go-register">Register</span>
        </p>

        <p id="login-error" class="auth-error"></p>

      </div>
    </div>
  `;

  const email = document.getElementById("login-email") as HTMLInputElement;
  const password = document.getElementById("login-password") as HTMLInputElement;
  const error = document.getElementById("login-error") as HTMLElement;

  document.getElementById("go-register")!.onclick = goRegister;

  document.getElementById("login-btn")!.onclick = async () => {
    error.textContent = "";

    if (!email.value || !password.value) {
      error.textContent = "Please fill in all fields";
      return;
    }

    try {
      await AuthService.login(email.value, password.value);
      onSuccess();
    } catch (err: any) {
      console.error(err);
      error.textContent = err.message || "Login failed";
    }
  };
}