export function renderLogin(onLogin: () => void, goRegister: () => void) {
  const root = document.getElementById("login-screen") as HTMLElement;

  root.innerHTML = `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Welcome Back</h2>
        <p class="subtitle">Login to your store</p>

        <form id="login-form">
          <div class="form-group">
            <label>Username</label>
            <input id="username" required />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input id="password" type="password" required />
          </div>

          <button class="full-btn">Login</button>
        </form>

        <div class="divider"></div>

        <p class="register-text">No account?</p>
        <button class="secondary-btn" id="go-register">Create Account</button>
      </div>
    </div>
  `;

  document.getElementById("go-register")!.onclick = goRegister;

  document.getElementById("login-form")!.onsubmit = (e) => {
    e.preventDefault();

    const user = {
      username: (document.getElementById("username") as HTMLInputElement).value,
      role: "Store Owner"
    };

    localStorage.setItem("tp_logged_in", "true");
    localStorage.setItem("tp_user", JSON.stringify(user));

    onLogin();
  };
}