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
const logoutBtn = document.getElementById("logout-btn");

async function show(view: View) {
  if (view === "dashboard") await renderDashboard(root);
  if (view === "products") await renderProducts(root);
  if (view === "sales") await renderSales(root);
  if (view === "reports") await renderReports(root);
  if (view === "suppliers") renderSuppliers(root);
  if (view === "credit") renderCredit(root);
}

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
  mainApp.style.display = "flex"; // IMPORTANT
  show("dashboard");
}

/* NAVIGATION */
document.getElementById("nav-dashboard")?.addEventListener("click", () => show("dashboard"));
document.getElementById("nav-products")?.addEventListener("click", () => show("products"));
document.getElementById("nav-sales")?.addEventListener("click", () => show("sales"));
document.getElementById("nav-reports")?.addEventListener("click", () => show("reports"));
document.getElementById("nav-suppliers")?.addEventListener("click", () => show("suppliers"));
document.getElementById("nav-credit")?.addEventListener("click", () => show("credit"));

logoutBtn?.addEventListener("click", () => {
  localStorage.clear();
  showLogin();
});

const isLoggedIn = localStorage.getItem("tp_logged_in") === "true";

if (isLoggedIn) {
  startApp();
} else {
  showRegister();
}