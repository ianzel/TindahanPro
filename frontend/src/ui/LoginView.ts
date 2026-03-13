export function renderLogin(
  onSuccess: () => void,
  onGoToRegister: () => void
): void {
  const loginScreen = document.getElementById("login-screen");
  const mainApp = document.getElementById("main-app");

  if (!loginScreen || !mainApp) {
    throw new Error("Login screen or main app container not found.");
  }

  loginScreen.innerHTML = `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Login</h2>
        <p>Please sign in to access TindahanPro.</p>

        <form id="login-form">
          <label>Username</label>
          <input id="login-username" required />

          <label>Password</label>
          <input id="login-password" type="password" required />

          <button type="submit">Login</button>
        </form>

        <p id="login-error" class="error-text"></p>

        <hr />
        <p>No account yet?</p>
        <button id="go-register-btn" type="button">Go to Register</button>
      </div>
    </div>
  `;

  const form = document.getElementById("login-form") as HTMLFormElement | null;
  const errorText = document.getElementById("login-error") as HTMLElement | null;
  const goRegisterBtn = document.getElementById("go-register-btn") as HTMLButtonElement | null;

  if (!form || !errorText || !goRegisterBtn) {
    throw new Error("Login form elements not found.");
  }

  form.onsubmit = async (event) => {
    event.preventDefault();

    const username = (document.getElementById("login-username") as HTMLInputElement).value.trim();
    const password = (document.getElementById("login-password") as HTMLInputElement).value.trim();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        errorText.textContent = Array.isArray(data.message)
          ? data.message.join(", ")
          : (data.message || "Invalid username or password.");
        return;
      }

      localStorage.setItem("tp_logged_in", "true");
      localStorage.setItem("tp_user", JSON.stringify(data.user));

      loginScreen.innerHTML = "";
      mainApp.style.display = "block";
      onSuccess();
    } catch {
      errorText.textContent = "Cannot connect to server.";
    }
  };

  goRegisterBtn.onclick = () => onGoToRegister();
}