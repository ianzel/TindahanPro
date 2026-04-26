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

const headerTitle = document.querySelector(".header-title") as HTMLElement;

const profileBtn = document.getElementById("profile-btn");
const profileMenu = document.getElementById("profile-menu");

const logoutBtn = document.getElementById("logout-btn");

/* SAFE VIEW LOADER */
async function show(view: View) {
  try {
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

  } catch (err) {
    console.error(err);
    root.innerHTML = `<p style="color:red;">Failed to load ${view}</p>`;
  }
}

/* AUTH */
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
profileBtn?.addEventListener("click", () => {
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

/* LOGOUT */
logoutBtn?.addEventListener("click", () => {
  localStorage.clear();
  showLogin();
});

/* AUTO LOGIN */
const isLoggedIn = localStorage.getItem("tp_logged_in") === "true";

if (isLoggedIn) {
  startApp();
} else {
  showRegister();
}

const editBtn = document.getElementById("edit-profile");
const modal = document.getElementById("profile-modal");
const saveBtn = document.getElementById("save-profile");

editBtn?.addEventListener("click", () => {
  modal?.classList.add("show");

  const user = JSON.parse(localStorage.getItem("tp_user") || "{}");

  (document.getElementById("edit-username") as HTMLInputElement).value =
    user.username || "";
});

/* SAVE PROFILE */
saveBtn?.addEventListener("click", () => {
  const username = (document.getElementById("edit-username") as HTMLInputElement).value;
  const password = (document.getElementById("edit-password") as HTMLInputElement).value;

  const user = JSON.parse(localStorage.getItem("tp_user") || "{}");

  user.username = username;
  if (password) user.password = password;

  localStorage.setItem("tp_user", JSON.stringify(user));

  alert("Profile updated!");

  modal?.classList.remove("show");
  loadUserInfo();
});

/* CLOSE MODAL */
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal?.classList.remove("show");
  }
});