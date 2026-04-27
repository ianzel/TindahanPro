export function renderRegister(goLogin: () => void) {
  const root = document.getElementById("login-screen") as HTMLElement;

  root.innerHTML = `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Create Account</h2>
        <p class="subtitle">Start your store system</p>

        <form id="register-form">
          <div class="form-group">
            <label>Username</label>
            <input id="username" required />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input id="password" type="password" required />
          </div>

          <button class="full-btn">Register</button>
        </form>

        <div class="divider"></div>

        <p class="register-text">Already have account?</p>
        <button class="secondary-btn" id="go-login">Login</button>
      </div>
    </div>
  `;

  document.getElementById("go-login")!.onclick = goLogin;

  document.getElementById("register-form")!.onsubmit = (e) => {
    e.preventDefault();
    goLogin();
  };
}