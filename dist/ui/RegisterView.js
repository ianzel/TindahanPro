export function renderRegister(goLogin) {
    const root = document.getElementById("login-screen");
    root.innerHTML = `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Register</h2>
        <p class="subtitle">Create your TindahanPro account</p>

        <form id="register-form">
          <div class="form-group">
            <label>Username</label>
            <input type="text" required />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" required />
          </div>

          <button type="submit" class="full-btn">Register</button>
        </form>

        <div class="divider"></div>

        <p class="register-text">Already have an account?</p>
        <button id="go-login" class="secondary-btn">Go to Login</button>
      </div>
    </div>
  `;
    document.getElementById("register-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem("tp_logged_in", "true");
        goLogin();
    });
    document.getElementById("go-login")?.addEventListener("click", goLogin);
}
