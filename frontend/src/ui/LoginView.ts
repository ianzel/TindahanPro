export function renderLogin(startApp: Function, showRegister: Function) {
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
        <button class="secondary-btn" id="go-register">
          Create Account
        </button>

      </div>
    </div>
  `;

  document.getElementById("login-form")!.onsubmit = (e) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const user = JSON.parse(localStorage.getItem("tp_user") || "{}");

    if (user.username === username && user.password === password) {
      localStorage.setItem("tp_logged_in", "true");
      startApp();
    } else {
      alert("Invalid credentials");
    }
  };

  document.getElementById("go-register")!.onclick = () => {
    showRegister();
  };
}