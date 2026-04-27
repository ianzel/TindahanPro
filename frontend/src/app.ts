import { renderDashboard } from "./ui/DashboardView.js";
import { renderProducts } from "./ui/ProductsView.js";
import { renderSales } from "./ui/SalesView.js";
import { renderReports } from "./ui/ReportsView.js";
import { renderSuppliers } from "./ui/SuppliersView.js";
import { renderCredit } from "./ui/CreditView.js";
import { renderLogin } from "./ui/LoginView.js";
import { renderRegister } from "./ui/RegisterView.js";

type View = "dashboard" | "products" | "sales" | "reports" | "suppliers" | "credit";

/* ROOT */
const root = document.getElementById("app") as HTMLElement;
const loginScreen = document.getElementById("login-screen") as HTMLElement;
const mainApp = document.getElementById("main-app") as HTMLElement;

/* PROFILE */
const profileBtn = document.getElementById("profile-btn") as HTMLButtonElement;
const profileMenu = document.getElementById("profile-menu") as HTMLDivElement;
const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;

/* PROFILE MODAL */
const editBtn = document.getElementById("edit-profile-btn") as HTMLButtonElement;
const modal = document.getElementById("profile-modal") as HTMLDivElement;
const saveBtn = document.getElementById("save-profile") as HTMLButtonElement;

/* =========================
   ACTIVE SIDEBAR
========================= */
function setActive(id: string) {
  document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(id)?.classList.add("active");
}

/* =========================
   SAFE VIEW RENDER
========================= */
async function show(view: View) {
  try {
    root.innerHTML = `<p>Loading...</p>`;

    if (view === "dashboard") await renderDashboard(root);
    if (view === "products") await renderProducts(root);
    if (view === "sales") await renderSales(root);
    if (view === "reports") await renderReports(root);
    if (view === "suppliers") renderSuppliers(root);
    if (view === "credit") renderCredit(root);

  } catch (err) {
    console.error(err);

    root.innerHTML = `
      <div class="card">
        <h2 style="color:red;">Something broke</h2>
        <p>Check backend connection.</p>
      </div>
    `;
  }
}

/* =========================
   PROFILE DROPDOWN
========================= */
if (profileBtn && profileMenu) {
  profileBtn.onclick = () => {
    profileMenu.classList.toggle("show");
  };

  window.addEventListener("click", (e) => {
    if (
      !profileBtn.contains(e.target as Node) &&
      !profileMenu.contains(e.target as Node)
    ) {
      profileMenu.classList.remove("show");
    }
  });
}

/* =========================
   LOAD USER INFO
========================= */
function loadUser() {
  const user = JSON.parse(localStorage.getItem("tp_user") || "{}");

  const name = document.getElementById("user-name");
  const role = document.getElementById("user-role");

  if (name) name.textContent = user.username || "User";
  if (role) role.textContent = user.role || "Store Owner";
}

/* =========================
   PROFILE EDIT (FIXED)
========================= */
editBtn?.addEventListener("click", () => {
  modal?.classList.add("show");

  const user = JSON.parse(localStorage.getItem("tp_user") || "{}");

  (document.getElementById("edit-username") as HTMLInputElement).value =
    user.username || "";
});

saveBtn?.addEventListener("click", () => {
  const username = (document.getElementById("edit-username") as HTMLInputElement).value;
  const password = (document.getElementById("edit-password") as HTMLInputElement).value;

  let user = JSON.parse(localStorage.getItem("tp_user") || "{}");

  user.username = username;

  if (password) {
    user.password = password;
  }

  localStorage.setItem("tp_user", JSON.stringify(user));

  alert("Profile updated!");

  modal?.classList.remove("show");

  loadUser();
});

/* CLOSE MODAL */
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal?.classList.remove("show");
  }
});

/* =========================
   AUTH FLOW
========================= */
function startApp() {
  loginScreen.innerHTML = "";
  mainApp.style.display = "flex";

  loadUser();

  setActive("nav-dashboard");
  show("dashboard");
}

function showLogin() {
  mainApp.style.display = "none";
  renderLogin(startApp, showRegister);
}

function showRegister() {
  mainApp.style.display = "none";
  renderRegister(showLogin);
}

/* =========================
   NAVIGATION
========================= */
document.getElementById("nav-dashboard")?.addEventListener("click", () => {
  setActive("nav-dashboard");
  show("dashboard");
});

document.getElementById("nav-products")?.addEventListener("click", () => {
  setActive("nav-products");
  show("products");
});

document.getElementById("nav-sales")?.addEventListener("click", () => {
  setActive("nav-sales");
  show("sales");
});

document.getElementById("nav-reports")?.addEventListener("click", () => {
  setActive("nav-reports");
  show("reports");
});

document.getElementById("nav-suppliers")?.addEventListener("click", () => {
  setActive("nav-suppliers");
  show("suppliers");
});

document.getElementById("nav-credit")?.addEventListener("click", () => {
  setActive("nav-credit");
  show("credit");
});

/* =========================
   LOGOUT
========================= */
logoutBtn?.addEventListener("click", () => {
  localStorage.clear();
  showLogin();
});

/* =========================
   AUTO LOGIN
========================= */
const isLoggedIn = localStorage.getItem("tp_logged_in") === "true";

if (isLoggedIn) {
  startApp();
} else {
  showRegister();
}