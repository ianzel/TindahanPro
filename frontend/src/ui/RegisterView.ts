export function renderRegister(showLogin: Function) {
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
        <button class="secondary-btn" id="go-login">
          Login
        </button>

      </div>
    </div>
  `;

  document.getElementById("register-form")!.onsubmit = (e) => {
    e.preventDefault();

    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const user = {
      username,
      password,
      role: "Store Owner"
    };

    localStorage.setItem("tp_user", JSON.stringify(user));
    localStorage.setItem("tp_logged_in", "true");

    alert("Account created!");
    location.reload();
  };

  document.getElementById("go-login")!.onclick = () => {
    showLogin();
  };
}