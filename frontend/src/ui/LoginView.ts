export function renderLogin(onLogin: Function, goRegister: Function) {
  const root = document.getElementById("login-screen") as HTMLElement;

  root.innerHTML = `
    <div class="auth-wrapper">

      <div class="auth-card">

        <h2>Welcome Back</h2>
        <p class="subtitle">Login to your TindahanPro account</p>

        <form id="login-form">

          <div class="input-group">
            <label>Username</label>
            <input id="username" placeholder="Enter username" required />
          </div>

          <div class="input-group">
            <label>Password</label>
            <input id="password" type="password" placeholder="Enter password" required />
          </div>

          <button class="auth-btn">Login</button>

        </form>

        <p class="switch-text">
          Don't have an account?
          <span id="go-register">Register</span>
        </p>

      </div>

    </div>
  `;

  /* LOGIN */
  document.getElementById("login-form")!.onsubmit = (e) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const saved = JSON.parse(localStorage.getItem("tp_user") || "{}");

    if (username === saved.username && password === saved.password) {
      localStorage.setItem("tp_logged_in", "true");
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  document.getElementById("go-register")!.onclick = () => goRegister();
}