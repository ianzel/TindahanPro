import { renderDashboard } from "./ui/DashboardView.js";
import { renderProducts } from "./ui/ProductsView.js";
import { renderSales } from "./ui/SalesView.js";
import { renderReports } from "./ui/ReportsView.js";
import { renderSuppliers } from "./ui/SuppliersView.js";
import { renderCredits } from "./ui/CreditView.js";
import { renderLogin } from "./ui/LoginView.js";
import { renderRegister } from "./ui/RegisterView.js";
import AuthService from "./services/AuthService.js";
const root = document.getElementById("app");
const loginScreen = document.getElementById("login-screen");
const mainApp = document.getElementById("main-app");
let currentUser = null;
const get = (id) => document.getElementById(id);
/* PROFILE */
function loadProfileUI() {
    if (!currentUser)
        return;
    const nameEl = get("user-name");
    const emailEl = get("user-email");
    const avatar = get("profile-avatar");
    if (nameEl)
        nameEl.textContent = currentUser.username;
    if (emailEl)
        emailEl.textContent = currentUser.email ?? "";
    if (avatar) {
        avatar.textContent = currentUser.username
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase();
    }
}
/* NAV ACTIVE */
function setActive(id) {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    get(id)?.classList.add("active");
}
/* VIEW RENDER */
async function show(view) {
    root.innerHTML = "";
    const container = document.createElement("div");
    root.appendChild(container);
    switch (view) {
        case "dashboard":
            await renderDashboard(container);
            break;
        case "products":
            await renderProducts(container);
            break;
        case "sales":
            await renderSales(container);
            break;
        case "reports":
            await renderReports(container);
            break;
        case "suppliers":
            renderSuppliers(container);
            break;
        case "credit":
            renderCredits(container);
            break;
    }
}
/* UI INIT */
function initUI() {
    const avatar = get("profile-avatar");
    const menu = get("profile-menu");
    const modal = get("profile-modal");
    /* FORCE CLOSE MODAL ON START */
    modal?.classList.add("hidden");
    /* PROFILE MENU TOGGLE */
    avatar?.addEventListener("click", (e) => {
        e.stopPropagation();
        menu?.classList.toggle("show");
    });
    document.addEventListener("click", () => {
        menu?.classList.remove("show");
    });
    menu?.addEventListener("click", e => e.stopPropagation());
    /* OPEN EDIT PROFILE */
    get("open-profile-edit")?.addEventListener("click", (e) => {
        e.stopPropagation();
        menu?.classList.remove("show");
        modal?.classList.remove("hidden");
        get("edit-username").value =
            currentUser?.username || "";
        get("edit-email").value =
            currentUser?.email || "";
        get("edit-password").value = "";
        get("edit-password-confirm").value = "";
    });
    /* CANCEL */
    get("cancel-profile")?.addEventListener("click", () => {
        modal?.classList.add("hidden");
    });
    /* SAVE */
    get("save-profile")?.addEventListener("click", () => {
        const name = get("edit-username");
        const email = get("edit-email");
        const pass = get("edit-password");
        const confirm = get("edit-password-confirm");
        if (!currentUser)
            return;
        if (pass.value !== confirm.value) {
            alert("Passwords do not match");
            return;
        }
        currentUser.username = name.value;
        currentUser.email = email.value;
        if (pass.value) {
            currentUser.password = pass.value;
        }
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
    if (localStorage.getItem("dark") === "true") {
        document.body.classList.add("dark");
    }
    get("dark-toggle")?.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("dark", String(document.body.classList.contains("dark")));
    });
}
/* START */
function startApp() {
    currentUser = AuthService.getUser();
    if (!currentUser)
        return startLogin();
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
        show(v);
    });
});
window.addEventListener("DOMContentLoaded", () => {
    try {
        AuthService.getUser() ? startApp() : startLogin();
    }
    catch {
        startLogin();
    }
});
