import { AuthService } from "../services/AuthService.js";

export function renderRegister(goLogin: () => void) {
  const root = document.getElementById("login-screen") as HTMLElement;

  root.innerHTML = `
    <div class="auth-wrapper">
      <div class="auth-card">

        <h2>Create Account</h2>
        <p class="subtitle">
          Register your store owner account to start using TindahanPro.
        </p>

        <div class="input-group">
          <label>Owner Name</label>
          <input id="reg-name" placeholder="Juan Dela Cruz" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input id="reg-email" type="email" placeholder="example@email.com" />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input id="reg-pass" type="password" placeholder="Enter password" />
        </div>

        <div class="input-group">
          <label>Confirm Password</label>
          <input id="reg-pass2" type="password" placeholder="Confirm password" />
        </div>

        <button class="auth-btn" id="register-btn">Register</button>

        <p class="switch-text">
          Already have an account?
          <span id="go-login">Login</span>
        </p>

        <p id="reg-error" class="auth-error"></p>

      </div>
    </div>
  `;

  document.getElementById("go-login")!.onclick = goLogin;

  document.getElementById("register-btn")!.onclick = async () => {
    const name = (document.getElementById("reg-name") as HTMLInputElement).value;
    const email = (document.getElementById("reg-email") as HTMLInputElement).value;
    const pass = (document.getElementById("reg-pass") as HTMLInputElement).value;
    const pass2 = (document.getElementById("reg-pass2") as HTMLInputElement).value;

    if (pass !== pass2) {
      document.getElementById("reg-error")!.textContent = "Passwords do not match";
      return;
    }

    try {
      await AuthService.register(name, email, pass);
      alert("Registered successfully!");
      goLogin();
    } catch {
      document.getElementById("reg-error")!.textContent = "Registration failed";
    }
  };
}