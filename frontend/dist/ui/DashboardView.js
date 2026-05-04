import { SalesService } from "../services/SalesService.js";
import { ProductService } from "../services/ProductService.js";
let salesChart = null;
let pieChart = null;
export async function renderDashboard(root) {
    let sales = [];
    let lowStock = [];
    let currentFilter = "today";
    /* ================= SAFE DATE ================= */
    const getSafeDate = (s) => {
        const raw = s.created_at || s.dateISO || s.date;
        const d = new Date(raw);
        return isNaN(d.getTime()) ? null : d;
    };
    /* ================= LOAD DATA ================= */
    const loadData = async () => {
        const rawSales = await SalesService.list();
        lowStock = await ProductService.list();
        sales = rawSales
            .map((s) => {
            const date = getSafeDate(s);
            return {
                productName: s.productName || "Unknown",
                quantity: Number(s.quantity || 0),
                unitPrice: Number(s.unitPrice || 0),
                totalAmount: Number(s.totalAmount || 0),
                profit: Number(s.profit || 0),
                date,
            };
        })
            .filter((s) => s.date !== null);
    };
    await loadData();
    /* ================= UI (UNCHANGED) ================= */
    root.innerHTML = `
    <div class="filter-bar">
      <h2>Dashboard</h2>

      <select id="filter">
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>

    <div class="stats-row" id="stats"></div>

    <div class="grid-2">
      <div class="card chart-card">
        <h3>Sales Trend</h3>
        <canvas id="salesChart"></canvas>
      </div>

      <div class="card">
        <h3>Low Stock Items</h3>

        ${lowStock.filter((p) => p.stock <= 5).length === 0
        ? "<p>No low stock items</p>"
        : `
              <ul class="low-stock-list">
                ${lowStock
            .filter((p) => p.stock <= 5)
            .map((p) => `
                      <li>
                        <span>${p.name}</span>
                        <strong>${p.stock}</strong>
                      </li>
                    `)
            .join("")}
              </ul>
            `}
      </div>
    </div>

    <div class="card chart-card">
      <h3>Sales Distribution</h3>
      <canvas id="pieChart"></canvas>
    </div>
  `;
    /* ================= FILTER ================= */
    function filterSales(type) {
        const now = new Date();
        return sales.filter((s) => {
            const date = s.date;
            if (!date)
                return false;
            if (type === "today") {
                return date.toDateString() === now.toDateString();
            }
            if (type === "week") {
                const start = new Date();
                start.setDate(now.getDate() - 7);
                return date.getTime() >= start.getTime();
            }
            if (type === "month") {
                const start = new Date();
                start.setMonth(now.getMonth() - 1);
                return date.getTime() >= start.getTime();
            }
            return true;
        });
    }
    /* ================= STATS ================= */
    function renderStats(filtered) {
        const totalSales = filtered.reduce((sum, s) => sum + s.totalAmount, 0);
        const totalProfit = filtered.reduce((sum, s) => sum + s.profit, 0);
        document.getElementById("stats").innerHTML = `
      <div class="stat-card blue">
        <h4>Sales</h4>
        <p>₱${totalSales.toFixed(2)}</p>
      </div>

      <div class="stat-card green">
        <h4>Profit</h4>
        <p>₱${totalProfit.toFixed(2)}</p>
      </div>

      <div class="stat-card orange">
        <h4>Transactions</h4>
        <p>${filtered.length}</p>
      </div>
    `;
    }
    /* ================= LINE CHART ================= */
    function drawLineChart(filtered) {
        const ChartJS = window.Chart;
        if (!ChartJS)
            return;
        const ctx = document.getElementById("salesChart");
        if (!ctx)
            return;
        if (salesChart) {
            salesChart.destroy();
            salesChart = null;
        }
        const grouped = {};
        filtered.forEach((s) => {
            const label = s.date.toLocaleDateString();
            grouped[label] = (grouped[label] || 0) + s.totalAmount;
        });
        salesChart = new ChartJS(ctx, {
            type: "line",
            data: {
                labels: Object.keys(grouped),
                datasets: [
                    {
                        label: "Sales",
                        data: Object.values(grouped),
                        borderWidth: 2,
                        tension: 0.3,
                    },
                ],
            },
        });
    }
    /* ================= PIE CHART (FIXED GLITCH) ================= */
    function drawPieChart(filtered) {
        const ChartJS = window.Chart;
        if (!ChartJS)
            return;
        const ctx = document.getElementById("pieChart");
        if (!ctx)
            return;
        if (pieChart) {
            pieChart.destroy();
            pieChart = null;
        }
        const productMap = {};
        filtered.forEach((s) => {
            const name = (s.productName || "Unknown").trim();
            if (!name)
                return;
            const value = Number(s.totalAmount);
            if (isNaN(value))
                return;
            productMap[name] = (productMap[name] || 0) + value;
        });
        const labels = Object.keys(productMap);
        const data = Object.values(productMap);
        pieChart = new ChartJS(ctx, {
            type: "doughnut",
            data: {
                labels,
                datasets: [
                    {
                        data,
                    },
                ],
            },
        });
    }
    /* ================= UPDATE ================= */
    function update(type) {
        currentFilter = type;
        const filtered = filterSales(type);
        renderStats(filtered);
        drawLineChart(filtered);
        drawPieChart(filtered);
    }
    /* ================= EVENTS ================= */
    const filter = document.getElementById("filter");
    filter.value = currentFilter;
    filter.addEventListener("change", (e) => {
        update(e.target.value);
    });
    /* ================= INIT ================= */
    update(currentFilter);
}
