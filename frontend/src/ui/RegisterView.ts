export function renderRegister(onGoToLogin: () => void): void {
  const root = document.getElementById("login-screen");

  if (!root) {
    throw new Error("Element #login-screen not found.");
  }

  root.innerHTML = `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Register</h2>
        <p>Create your TindahanPro account.</p>

        <form id="register-form">
          <label>Username</label>
          <input id="register-username" required />

          <label>Password</label>
          <input id="register-password" type="password" required />

          <button type="submit">Register</button>
        </form>

        <p id="register-message" class="error-text"></p>

        <hr />
        <p>Already have an account?</p>
        <button id="go-login-btn" type="button">Go to Login</button>
      </div>
    </div>
  `;

  const form = document.getElementById("register-form") as HTMLFormElement | null;
  const message = document.getElementById("register-message") as HTMLElement | null;
  const goLoginBtn = document.getElementById("go-login-btn") as HTMLButtonElement | null;

  if (!form || !message || !goLoginBtn) {
    throw new Error("Register form elements not found.");
  }

  form.onsubmit = async (event) => {
    event.preventDefault();

    const username = (document.getElementById("register-username") as HTMLInputElement).value.trim();
    const password = (document.getElementById("register-password") as HTMLInputElement).value.trim();

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        message.textContent = Array.isArray(data.message)
          ? data.message.join(", ")
          : (data.message || "Registration failed.");
        return;
      }

      message.style.color = "green";
      message.textContent = "Registration successful. Redirecting to login...";

      setTimeout(() => {
        onGoToLogin();
      }, 1000);
    } catch {
      message.textContent = "Cannot connect to server.";
    }
  };

  goLoginBtn.onclick = () => onGoToLogin();
}