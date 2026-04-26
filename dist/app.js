import { renderDashboard } from "./ui/DashboardView.js";
import { renderProducts } from "./ui/ProductsView.js";
import { renderSales } from "./ui/SalesView.js";
import { renderReports } from "./ui/ReportsView.js";
import { renderSuppliers } from "./ui/SuppliersView.js";
import { renderCredit } from "./ui/CreditView.js";
import { renderLogin } from "./ui/LoginView.js";
import { renderRegister } from "./ui/RegisterView.js";
const root = document.getElementById("app");
const loginScreen = document.getElementById("login-screen");
const mainApp = document.getElementById("main-app");
const headerTitle = document.querySelector(".header-title");
const profileBtn = document.getElementById("profile-btn");
const profileMenu = document.getElementById("profile-menu");
const logoutBtn = document.getElementById("logout-btn");
/* ===== SAFE RENDER ===== */
async function show(view) {
    try {
        if (headerTitle) {
            headerTitle.textContent =
                view.charAt(0).toUpperCase() + view.slice(1);
        }
        root.innerHTML = `<p>Loading...</p>`;
        if (view === "dashboard")
            await renderDashboard(root);
        if (view === "products")
            await renderProducts(root);
        if (view === "sales")
            await renderSales(root);
        if (view === "reports")
            await renderReports(root);
        if (view === "suppliers")
            renderSuppliers(root);
        if (view === "credit")
            renderCredit(root);
    }
    catch (err) {
        console.error("VIEW ERROR:", err);
        root.innerHTML = `
      <div class="card">
        <h2 style="color:red;">Something broke</h2>
      </div>
    `;
    }
}
/* ===== PROFILE ===== */
if (profileBtn && profileMenu) {
    profileBtn.onclick = () => {
        profileMenu.classList.toggle("show");
    };
    window.onclick = (e) => {
        if (!profileBtn.contains(e.target) &&
            !profileMenu.contains(e.target)) {
            profileMenu.classList.remove("show");
        }
    };
}
/* ===== USER INFO ===== */
function loadUser() {
    const user = JSON.parse(localStorage.getItem("tp_user") || "{}");
    const name = document.getElementById("user-name");
    const role = document.getElementById("user-role");
    if (name)
        name.textContent = user.username || "User";
    if (role)
        role.textContent = user.role || "Store Owner";
}
/* ===== AUTH ===== */
function startApp() {
    loginScreen.innerHTML = "";
    mainApp.style.display = "flex";
    loadUser();
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
/* ===== NAV ===== */
document.getElementById("nav-dashboard")?.addEventListener("click", () => show("dashboard"));
document.getElementById("nav-products")?.addEventListener("click", () => show("products"));
document.getElementById("nav-sales")?.addEventListener("click", () => show("sales"));
document.getElementById("nav-reports")?.addEventListener("click", () => show("reports"));
document.getElementById("nav-suppliers")?.addEventListener("click", () => show("suppliers"));
document.getElementById("nav-credit")?.addEventListener("click", () => show("credit"));
/* ===== LOGOUT ===== */
logoutBtn?.addEventListener("click", () => {
    localStorage.clear();
    showLogin();
});
/* ===== AUTO LOGIN ===== */
const isLoggedIn = localStorage.getItem("tp_logged_in") === "true";
if (isLoggedIn) {
    startApp();
}
else {
    showRegister();
}
