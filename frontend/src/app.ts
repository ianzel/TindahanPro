import { renderDashboard } from "./ui/DashboardView.js";
import { renderProducts } from "./ui/ProductsView.js";
import { renderSales } from "./ui/SalesView.js";
import { renderReports } from "./ui/ReportsView.js";
import { renderSuppliers } from "./ui/SuppliersView.js";
import { renderCredits } from "./ui/CreditView.js";
import { renderLogin } from "./ui/LoginView.js";
import { renderRegister } from "./ui/RegisterView.js";
import { AuthService } from "./services/AuthService.js";

/* ========================= */
type View =
  | "dashboard"
  | "products"
  | "sales"
  | "reports"
  | "suppliers"
  | "credit";

const root = document.getElementById("app")!;
const loginScreen = document.getElementById("login-screen")!;
const mainApp = document.getElementById("main-app")!;

/* =========================
   USER (FIXED SOURCE OF TRUTH)
========================= */
let currentUser = AuthService.getUser();

/* =========================
   SAFE GET
========================= */
function get<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

/* =========================
   LOAD PROFILE UI
========================= */
function loadProfileUI() {
  if (!currentUser) return;

  const nameEl = get("user-name");
  const emailEl = get("user-email");
  const avatar = get<HTMLImageElement>("profile-avatar");

  if (nameEl) nameEl.textContent = currentUser.username;
  if (emailEl) emailEl.textContent = currentUser.email;

  if (avatar) {
    avatar.src = `https://ui-avatars.com/api/?name=${currentUser.username}`;
  }
}

/* =========================
   NAV ACTIVE
========================= */
function setActive(id: string) {
  document.querySelectorAll(".nav-btn").forEach(btn =>
    btn.classList.remove("active")
  );
  document.getElementById(id)?.classList.add("active");
}

/* =========================
   VIEW SWITCH
========================= */
async function show(view: View) {
  root.innerHTML = "Loading...";

  if (view === "dashboard") await renderDashboard(root);
  if (view === "products") await renderProducts(root);
  if (view === "sales") await renderSales(root);
  if (view === "reports") await renderReports(root);
  if (view === "suppliers") renderSuppliers(root);
  if (view === "credit") renderCredits(root);
}

/* =========================
   PROFILE + DARK MODE
========================= */
function initUI() {

  const avatar = get("profile-avatar");
  const menu = get("profile-menu");
  const modal = get("profile-modal");

  const darkBtn = get("dark-toggle");
  const editBtn = get("open-profile-edit");
  const saveBtn = get("save-profile");
  const cancelBtn = get("cancel-profile");
  const logoutBtn = get("logout-btn");

  loadProfileUI();

  /* PROFILE MENU FIX */
  avatar?.addEventListener("click", (e) => {
    e.stopPropagation();
    menu?.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    menu?.classList.remove("show");
  });

  /* OPEN MODAL */
  editBtn?.addEventListener("click", () => {
    menu?.classList.remove("show");
    modal?.classList.add("show");

    (get<HTMLInputElement>("edit-username")!.value =
      currentUser?.username || "");

    (get<HTMLInputElement>("edit-email")!.value =
      currentUser?.email || "");

    (get<HTMLInputElement>("edit-password")!.value = "");
  });

  /* CLOSE */
  cancelBtn?.addEventListener("click", () => {
    modal?.classList.remove("show");
  });

  /* SAVE PROFILE */
  saveBtn?.addEventListener("click", async () => {
    const username = get<HTMLInputElement>("edit-username")!.value;
    const email = get<HTMLInputElement>("edit-email")!.value;
    const password = get<HTMLInputElement>("edit-password")!.value;

    const res = await fetch(
      `http://localhost:3000/users/${currentUser.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      }
    );

    if (res.ok) {
      currentUser.username = username;
      currentUser.email = email;

      localStorage.setItem("tp_user", JSON.stringify(currentUser));

      loadProfileUI();
      modal?.classList.remove("show");

      alert("Profile updated!");
    } else {
      alert("Update failed");
    }
  });

  /* LOGOUT */
  logoutBtn?.addEventListener("click", () => {
    AuthService.logout();
    location.reload();
  });

  /* DARK MODE FIX */
  if (localStorage.getItem("dark") === "true") {
    document.body.classList.add("dark");
  }

  darkBtn?.addEventListener("click", (e) => {
    e.stopPropagation();

    document.body.classList.toggle("dark");

    localStorage.setItem(
      "dark",
      String(document.body.classList.contains("dark"))
    );
  });
}

/* =========================
   START APP (FIXED LOGIN ISSUE)
========================= */
function startApp() {
  loginScreen.innerHTML = "";
  mainApp.style.display = "flex";

  currentUser = AuthService.getUser(); // refresh user

  if (!currentUser) {
    showLogin();
    return;
  }

  initUI();

  setActive("nav-dashboard");
  show("dashboard");
}

/* =========================
   LOGIN / REGISTER
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
    document.getElementById(`nav-${v}`)?.addEventListener("click", () => {
      setActive(`nav-${v}`);
      show(v as View);
    });
  }
);

/* =========================
   AUTO LOGIN FIXED
========================= */
AuthService.isLoggedIn() ? startApp() : showLogin();