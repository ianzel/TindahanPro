import { renderDashboard } from "./ui/DashboardView.js";
import { renderProducts } from "./ui/ProductsView.js";
import { renderSales } from "./ui/SalesView.js";
import { renderReports } from "./ui/ReportsView.js";
import { renderSuppliers } from "./ui/SuppliersView.js";
import { renderCredit } from "./ui/CreditView.js";
import { renderLogin } from "./ui/LoginView.js";
import { renderRegister } from "./ui/RegisterView.js";

type View = "dashboard" | "products" | "sales" | "reports" | "suppliers" | "credit";

/* =========================
   ROOT ELEMENTS (SAFE)
========================= */
const root = document.getElementById("app") as HTMLElement;
const loginScreen = document.getElementById("login-screen") as HTMLElement;
const mainApp = document.getElementById("main-app") as HTMLElement;

/* =========================
   SAFE QUERY FUNCTION
========================= */
function el<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/* =========================
   ACTIVE SIDEBAR
========================= */
function setActive(id: string) {
  document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.classList.remove("active");
  });

  el(id)?.classList.add("active");
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
    console.error("VIEW ERROR:", err);

    root.innerHTML = `
      <div class="card">
        <h2 style="color:red;">Something broke</h2>
        <p>Check backend / API</p>
      </div>
    `;
  }
}

/* =========================
   PROFILE SYSTEM (SAFE INIT)
========================= */
function initProfile() {
  const profileBtn = el<HTMLButtonElement>("profile-btn");
  const profileMenu = el<HTMLDivElement>("profile-menu");
  const logoutBtn = el<HTMLButtonElement>("logout-btn");

  const editBtn = el<HTMLButtonElement>("edit-profile-btn");
  const modal = el<HTMLDivElement>("profile-modal");
  const saveBtn = el<HTMLButtonElement>("save-profile");

  /* TOGGLE MENU */
  profileBtn?.addEventListener("click", () => {
    profileMenu?.classList.toggle("show");
  });

  /* CLOSE OUTSIDE */
  window.addEventListener("click", (e) => {
    if (
      profileBtn &&
      profileMenu &&
      !profileBtn.contains(e.target as Node) &&
      !profileMenu.contains(e.target as Node)
    ) {
      profileMenu.classList.remove("show");
    }
  });

  /* LOAD USER */
  loadUser();

  /* EDIT PROFILE */
  editBtn?.addEventListener("click", () => {
    modal?.classList.add("show");

    const user = JSON.parse(localStorage.getItem("tp_user") || "{}");

    const usernameInput = el<HTMLInputElement>("edit-username");
    if (usernameInput) {
      usernameInput.value = user.username || "";
    }
  });

  /* SAVE PROFILE */
  saveBtn?.addEventListener("click", () => {
    const username = el<HTMLInputElement>("edit-username")?.value || "";
    const password = el<HTMLInputElement>("edit-password")?.value || "";

    let user = JSON.parse(localStorage.getItem("tp_user") || "{}");

    user.username = username;
    if (password) user.password = password;

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

  /* LOGOUT (IMPORTANT FIX) */
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("tp_logged_in"); // DO NOT CLEAR ALL
    showLogin();
  });
}

/* =========================
   LOAD USER INFO
========================= */
function loadUser() {
  const user = JSON.parse(localStorage.getItem("tp_user") || "{}");

  const name = el("user-name");
  const role = el("user-role");

  if (name) name.textContent = user.username || "User";
  if (role) role.textContent = user.role || "Store Owner";
}

/* =========================
   AUTH FLOW
========================= */
function startApp() {
  loginScreen.innerHTML = "";
  mainApp.style.display = "flex";

  initProfile(); // ✅ VERY IMPORTANT (fix blank issue)

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
el("nav-dashboard")?.addEventListener("click", () => {
  setActive("nav-dashboard");
  show("dashboard");
});

el("nav-products")?.addEventListener("click", () => {
  setActive("nav-products");
  show("products");
});

el("nav-sales")?.addEventListener("click", () => {
  setActive("nav-sales");
  show("sales");
});

el("nav-reports")?.addEventListener("click", () => {
  setActive("nav-reports");
  show("reports");
});

el("nav-suppliers")?.addEventListener("click", () => {
  setActive("nav-suppliers");
  show("suppliers");
});

el("nav-credit")?.addEventListener("click", () => {
  setActive("nav-credit");
  show("credit");
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