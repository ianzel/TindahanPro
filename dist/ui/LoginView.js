export function renderLogin(onLogin, goRegister) {
    const root = document.getElementById("login-screen");
    root.innerHTML = `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>TindahanPro</h2>
        <p class="subtitle">Sign in to your account</p>

        <form id="login-form">
          <label>Username</label>
          <input type="text" id="username" required />

          <label>Password</label>
          <input type="password" id="password" required />

          <button type="submit">Login</button>
        </form>

        <p class="register-text">
          No account? 
          <span id="go-register">Create one</span>
        </p>
      </div>
    </div>
  `;
    document.getElementById("login-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        localStorage.setItem("tp_logged_in", "true");
        onLogin();
    });
    document.getElementById("go-register")?.addEventListener("click", goRegister);
}
