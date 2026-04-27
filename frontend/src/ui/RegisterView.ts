export function renderRegister(goLogin: Function) {
  const root = document.getElementById("login-screen") as HTMLElement;

  root.innerHTML = `
    <div class="auth-wrapper">

      <div class="auth-card">

        <h2>Create Account</h2>
        <p class="subtitle">Start managing your store</p>

        <form id="register-form">

          <div class="input-group">
            <label>Username</label>
            <input id="reg-username" placeholder="Enter username" required />
          </div>

          <div class="input-group">
            <label>Password</label>
            <input id="reg-password" type="password" placeholder="Enter password" required />
          </div>

          <div class="input-group">
            <label>Confirm Password</label>
            <input id="reg-confirm" type="password" placeholder="Confirm password" required />
          </div>

          <button class="auth-btn">Register</button>

        </form>

        <p class="switch-text">
          Already have an account?
          <span id="go-login">Login</span>
        </p>

      </div>

    </div>
  `;

  /* REGISTER */
  document.getElementById("register-form")!.onsubmit = (e) => {
    e.preventDefault();

    const username = (document.getElementById("reg-username") as HTMLInputElement).value;
    const password = (document.getElementById("reg-password") as HTMLInputElement).value;
    const confirm = (document.getElementById("reg-confirm") as HTMLInputElement).value;

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      username,
      password,
      role: "Store Owner"
    };

    localStorage.setItem("tp_user", JSON.stringify(user));

    alert("Registered successfully!");
    goLogin();
  };

  document.getElementById("go-login")!.onclick = () => goLogin();
}