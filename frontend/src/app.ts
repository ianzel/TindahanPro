import { renderDashboard } from "./ui/DashboardView.js";
import { renderProducts } from "./ui/ProductsView.js";
import { renderSales } from "./ui/SalesView.js";
import { renderReports } from "./ui/ReportsView.js";
import { renderSuppliers } from "./ui/SuppliersView.js";
import { renderCredit } from "./ui/CreditView.js";
import { renderLogin } from "./ui/LoginView.js";
import { renderRegister } from "./ui/RegisterView.js";
import { AuthService } from "./services/AuthService.js";

type View =
  | "dashboard"
  | "products"
  | "sales"
  | "reports"
  | "suppliers"
  | "credit";

const root = document.getElementById("app") as HTMLElement;
const loginScreen = document.getElementById("login-screen") as HTMLElement;
const mainApp = document.getElementById("main-app") as HTMLElement;

function el<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/* =========================
   ACTIVE NAV
========================= */
function setActive(id: string) {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  el(id)?.classList.add("active");
}

/* =========================
   VIEW SWITCHER
========================= */
async function show(view: View) {
  root.innerHTML = `<p>Loading...</p>`;

  if (view === "dashboard") await renderDashboard(root);
  if (view === "products") await renderProducts(root);
  if (view === "sales") await renderSales(root);
  if (view === "reports") await renderReports(root);
  if (view === "suppliers") renderSuppliers(root);
  if (view === "credit") renderCredit(root);
}

/* =========================
   PROFILE DROPDOWN (FIXED)
========================= */
function initProfile() {
  const profile = document.getElementById("profile-avatar");
  const menu = document.getElementById("profile-menu");
  const logout = document.getElementById("logout-btn");
  const editBtn = document.getElementById("edit-profile-btn");
  const modal = document.getElementById("profile-modal");

  if (!profile || !menu) return;

  // OPEN / CLOSE MENU
  profile.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    menu.classList.remove("show");
  });

  // OPEN MODAL
  editBtn?.addEventListener("click", () => {
    modal?.classList.add("show");
    menu.classList.remove("show");
  });

  // CLOSE MODAL OUTSIDE CLICK
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  // LOGOUT
  logout?.addEventListener("click", () => {
    AuthService.logout();
    location.reload();
  });
}

/* =========================
   DARK MODE (FIXED)
========================= */
function initDarkMode() {
  const btn = document.getElementById("dark-toggle");

  // restore
  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
  }

  btn?.addEventListener("click", (e) => {
    e.stopPropagation();

    document.body.classList.toggle("dark");

    localStorage.setItem(
      "dark",
      String(document.body.classList.contains("dark"))
    );
  });
}

/* =========================
   START APP
========================= */
function startApp() {
  loginScreen.innerHTML = "";
  mainApp.style.display = "flex";

  initProfile();
  initDarkMode();

  setActive("nav-dashboard");
  show("dashboard");
}

/* =========================
   AUTH SCREENS
========================= */
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
["dashboard", "products", "sales", "reports", "suppliers", "credit"].forEach(
  (v) => {
    el(`nav-${v}`)?.addEventListener("click", () => {
      setActive(`nav-${v}`);
      show(v as View);
    });
  }
);

/* =========================
   AUTO LOGIN
========================= */
AuthService.isLoggedIn() ? startApp() : showLogin();