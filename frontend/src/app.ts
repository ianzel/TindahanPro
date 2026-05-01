import { renderDashboard } from "./ui/DashboardView.js";
import { renderProducts } from "./ui/ProductsView.js";
import { renderSales } from "./ui/SalesView.js";
import { renderReports } from "./ui/ReportsView.js";
import { renderSuppliers } from "./ui/SuppliersView.js";
import { renderCredits } from "./ui/CreditView.js";
import { renderLogin } from "./ui/LoginView.js";
import { renderRegister } from "./ui/RegisterView.js";

import AuthService from "./services/AuthService.js";

type User = {
  id?: number;
  username: string;
  email?: string;
};

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

let currentUser: User | null = null;

const get = (id: string) => document.getElementById(id);

/* PROFILE UI */
function loadProfileUI() {
  if (!currentUser) return;

  const nameEl = get("user-name");
  const emailEl = get("user-email");
  const avatar = get("profile-avatar");

  if (nameEl) nameEl.textContent = currentUser.username;
  if (emailEl) emailEl.textContent = currentUser.email ?? "";

  if (avatar) {
    avatar.textContent = currentUser.username
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  }
}

/* NAV ACTIVE */
function setActive(id: string) {
  document.querySelectorAll(".nav-btn").forEach(b =>
    b.classList.remove("active")
  );
  get(id)?.classList.add("active");
}

/* VIEW */
async function show(view: View) {
  root.innerHTML = "Loading...";

  switch (view) {
    case "dashboard":
      await renderDashboard(root);
      break;
    case "products":
      await renderProducts(root);
      break;
    case "sales":
      await renderSales(root);
      break;
    case "reports":
      await renderReports(root);
      break;
    case "suppliers":
      renderSuppliers(root);
      break;
    case "credit":
      renderCredits(root);
      break;
  }
}

/* UI INIT (FIXED CLICK ISSUE) */
function initUI() {
  const avatar = get("profile-avatar");
  const menu = get("profile-menu");
  const modal = get("profile-modal");

  if (!avatar || !menu) return;

  /* OPEN MENU */
  avatar.onclick = (e) => {
    e.stopPropagation();
    menu.classList.toggle("show");
  };

  /* CLOSE OUTSIDE */
  document.addEventListener("click", () => {
    menu.classList.remove("show");
  });

  /* STOP MENU CLOSE */
  menu.onclick = (e) => {
    e.stopPropagation();
  };

  /* 🔥 FIXED: EDIT PROFILE ALWAYS WORKS */
  const editBtn = get("open-profile-edit");
  if (editBtn) {
    editBtn.onclick = (e) => {
      e.stopPropagation();

      menu.classList.remove("show");

      if (modal) modal.classList.remove("hidden");

      const input = get("edit-username") as HTMLInputElement;
      if (input && currentUser) {
        input.value = currentUser.username;
      }
    };
  }

  /* CANCEL */
  get("cancel-profile")?.addEventListener("click", () => {
    modal?.classList.add("hidden");
  });

  /* SAVE */
  get("save-profile")?.addEventListener("click", () => {
    const input = get("edit-username") as HTMLInputElement;

    if (!input || !currentUser) return;

    currentUser.username = input.value;

    localStorage.setItem("tp_user", JSON.stringify(currentUser));

    loadProfileUI();
    modal?.classList.add("hidden");
  });

  /* LOGOUT */
  get("logout-btn")?.addEventListener("click", () => {
    AuthService.logout();
    startLogin();
  });

  /* DARK MODE */
  get("dark-toggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", String(document.body.classList.contains("dark")));
  });
}

/* START APP */
function startApp() {
  currentUser = AuthService.getUser();

  if (!currentUser) return startLogin();

  loginScreen.style.display = "none";
  mainApp.style.display = "flex";

  initUI();
  loadProfileUI();

  setActive("nav-dashboard");
  show("dashboard");
}

/* LOGIN */
function startLogin() {
  mainApp.style.display = "none";
  loginScreen.style.display = "block";

  renderLogin(startApp, () => {
    mainApp.style.display = "none";
    renderRegister(startLogin);
  });
}

/* NAV */
["dashboard", "products", "sales", "reports", "suppliers", "credit"]
  .forEach(v => {
    get(`nav-${v}`)?.addEventListener("click", () => {
      setActive(`nav-${v}`);
      show(v as View);
    });
  });

/* BOOT */
window.addEventListener("DOMContentLoaded", () => {
  try {
    AuthService.getUser() ? startApp() : startLogin();
  } catch (err) {
    console.error(err);
    startLogin();
  }
});