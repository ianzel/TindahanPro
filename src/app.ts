import { renderDashboard } from "./ui/DashboardView.js";
import { renderProducts } from "./ui/ProductsView.js";
import { renderSales } from "./ui/SalesView.js";
import { renderReports } from "./ui/ReportsView.js";
import { renderSuppliers } from "./ui/SuppliersView.js";
import { renderCredit } from "./ui/CreditView.js";
import { renderLogin } from "./ui/LoginView.js";
import { renderRegister } from "./ui/RegisterView.js";

type View = "dashboard" | "products" | "sales" | "reports" | "suppliers" | "credit";

const root = document.getElementById("app") as HTMLElement;
const loginScreen = document.getElementById("login-screen") as HTMLElement;
const mainApp = document.getElementById("main-app") as HTMLElement;

/* HEADER TITLE */
const headerTitle = document.querySelector(".header-title") as HTMLElement;

/* PROFILE */
const profileBtn = document.getElementById("profile-btn");
const profileMenu = document.getElementById("profile-menu");

/* VIEW RENDER */
async function show(view: View) {
  // Update header title
  if (headerTitle) {
    headerTitle.textContent =
      view.charAt(0).toUpperCase() + view.slice(1);
  }

  if (view === "dashboard") await renderDashboard(root);
  if (view === "products") await renderProducts(root);
  if (view === "sales") await renderSales(root);
  if (view === "reports") await renderReports(root);
  if (view === "suppliers") renderSuppliers(root);
  if (view === "credit") renderCredit(root);
}

/* AUTH SCREENS */
function showLogin() {
  mainApp.style.display = "none";
  renderLogin(startApp, showRegister);
}

function showRegister() {
  mainApp.style.display = "none";
  renderRegister(showLogin);
}

function startApp() {
  loginScreen.innerHTML = "";
  mainApp.style.display = "flex";
  loadUserInfo();
  show("dashboard");
}

/* PROFILE TOGGLE */
profileBtn?.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent closing immediately
  profileMenu?.classList.toggle("show");
});

/* CLOSE WHEN CLICK OUTSIDE */
window.addEventListener("click", (e) => {
  if (
    !profileBtn?.contains(e.target as Node) &&
    !profileMenu?.contains(e.target as Node)
  ) {
    profileMenu?.classList.remove("show");
  }
});

/* LOAD USER INFO */
function loadUserInfo() {
  const user = JSON.parse(localStorage.getItem("tp_user") || "{}");

  const nameEl = document.getElementById("user-name");
  const roleEl = document.getElementById("user-role");

  if (nameEl) nameEl.textContent = user.username || "User";
  if (roleEl) roleEl.textContent = user.role || "Store Owner";
}

/* NAVIGATION */
document.getElementById("nav-dashboard")?.addEventListener("click", () => show("dashboard"));
document.getElementById("nav-products")?.addEventListener("click", () => show("products"));
document.getElementById("nav-sales")?.addEventListener("click", () => show("sales"));
document.getElementById("nav-reports")?.addEventListener("click", () => show("reports"));
document.getElementById("nav-suppliers")?.addEventListener("click", () => show("suppliers"));
document.getElementById("nav-credit")?.addEventListener("click", () => show("credit"));

/* LOGOUT (handles BOTH sidebar + profile logout) */
function setupLogout() {
  const logoutButtons = document.querySelectorAll("#logout-btn");

  logoutButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      localStorage.clear();
      showLogin();
    });
  });
}

/* RUN LOGOUT SETUP AFTER LOAD */
setTimeout(setupLogout, 0);

/* AUTO LOGIN CHECK */
const isLoggedIn = localStorage.getItem("tp_logged_in") === "true";

if (isLoggedIn) {
  startApp();
} else {
  showRegister();
}