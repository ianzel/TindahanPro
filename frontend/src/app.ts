import { renderDashboard } from "./ui/DashboardView.js";
import { renderProducts } from "./ui/ProductsView.js";
import { renderSales } from "./ui/SalesView.js";
import { renderReports } from "./ui/ReportsView.js";
import { renderSuppliers } from "./ui/SuppliersView.js";
import { renderCredit } from "./ui/CreditView.js";
import { renderLogin } from "./ui/LoginView.js";
import { renderRegister } from "./ui/RegisterView.js";

type View = "dashboard" | "products" | "sales" | "reports" | "suppliers" | "credit";

const appElement = document.getElementById("app");
const loginScreenElement = document.getElementById("login-screen");
const mainAppElement = document.getElementById("main-app");
const logoutBtn = document.getElementById("logout-btn");

if (!appElement || !loginScreenElement || !mainAppElement) {
  throw new Error("Required app containers not found in index.html");
}

const root: HTMLElement = appElement;
const loginScreen: HTMLElement = loginScreenElement;
const mainApp: HTMLElement = mainAppElement;

async function show(view: View): Promise<void> {
  if (view === "dashboard") renderDashboard(root);
  if (view === "products") await renderProducts(root);
  if (view === "sales") renderSales(root);
  if (view === "reports") renderReports(root);
  if (view === "suppliers") renderSuppliers(root);
  if (view === "credit") renderCredit(root);
}

function showLogin(): void {
  mainApp.style.display = "none";
  renderLogin(startApp, showRegister);
}

function showRegister(): void {
  mainApp.style.display = "none";
  renderRegister(showLogin);
}

function startApp(): void {
  loginScreen.innerHTML = "";
  mainApp.style.display = "block";
  void show("dashboard");
}

document.getElementById("nav-dashboard")?.addEventListener("click", () => void show("dashboard"));
document.getElementById("nav-products")?.addEventListener("click", () => void show("products"));
document.getElementById("nav-sales")?.addEventListener("click", () => void show("sales"));
document.getElementById("nav-reports")?.addEventListener("click", () => void show("reports"));
document.getElementById("nav-suppliers")?.addEventListener("click", () => void show("suppliers"));
document.getElementById("nav-credit")?.addEventListener("click", () => void show("credit"));

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("tp_logged_in");
  localStorage.removeItem("tp_user");
  showLogin();
});

const isLoggedIn = localStorage.getItem("tp_logged_in") === "true";

if (isLoggedIn) {
  startApp();
} else {
  showRegister();
}