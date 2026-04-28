import { ReportService } from "../services/ReportService.js";
let salesChart = null;
let pieChart = null;
export async function renderDashboard(root) {
    const lowStock = await ReportService.lowStockItems();
    const sales = await ReportService.getAllSales();
    root.innerHTML = `
    <div class="filter-bar">
      <h2>Dashboard</h2>

      <select id="filter">
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>

    <!-- STATS -->
    <div class="stats-row" id="stats"></div>

    <!-- CHART + LOW STOCK -->
    <div class="grid-2">
      <div class="card chart-card">
        <h3>Sales Trend</h3>
        <canvas id="salesChart"></canvas>
      </div>

     <div class="card">
  <h3>Low Stock Items</h3>

  ${lowStock.length === 0
        ? "<p>No low stock items</p>"
        : `
        <ul class="low-stock-list">
          ${lowStock.map((p) => `
            <li>
              <span>${p.name}</span>
              <strong>${p.stock}</strong>
            </li>
          `).join("")}
        </ul>
      `}
</div>
    </div>

    <!-- PIE -->
    <div class="card chart-card">
      <h3>Sales Distribution</h3>
      <canvas id="pieChart"></canvas>
    </div>
  `;
    /* ===== FILTER ===== */
    function filterSales(type) {
        const now = new Date();
        if (type === "today") {
            return sales.filter((s) => new Date(s.dateISO).toDateString() === now.toDateString());
        }
        if (type === "week") {
            const d = new Date();
            d.setDate(now.getDate() - 7);
            return sales.filter((s) => new Date(s.dateISO) >= d);
        }
        if (type === "month") {
            const d = new Date();
            d.setMonth(now.getMonth() - 1);
            return sales.filter((s) => new Date(s.dateISO) >= d);
        }
        return sales;
    }
    /* ===== STATS ===== */
    function renderStats(filtered) {
        const totalSales = filtered.reduce((sum, s) => sum + Number(s.totalAmount || 0), 0);
        const totalProfit = filtered.reduce((sum, s) => sum + Number(s.profit || 0), 0);
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
    /* ===== CHARTS ===== */
    function drawCharts(filtered) {
        const ChartJS = window.Chart;
        if (!ChartJS)
            return;
        if (salesChart)
            salesChart.destroy();
        if (pieChart)
            pieChart.destroy();
        /* LINE */
        const grouped = {};
        filtered.forEach((s) => {
            const d = new Date(s.dateISO).toLocaleDateString();
            grouped[d] = (grouped[d] || 0) + Number(s.totalAmount);
        });
        const ctx = document.getElementById("salesChart");
        if (ctx) {
            salesChart = new ChartJS(ctx, {
                type: "line",
                data: {
                    labels: Object.keys(grouped),
                    datasets: [{
                            label: "Sales",
                            data: Object.values(grouped),
                            borderWidth: 2,
                            tension: 0.3
                        }]
                }
            });
        }
        /* PIE */
        const productMap = {};
        filtered.forEach((s) => {
            const name = s.productName || "Unknown";
            productMap[name] = (productMap[name] || 0) + Number(s.totalAmount);
        });
        const pieCtx = document.getElementById("pieChart");
        if (pieCtx && Object.keys(productMap).length > 0) {
            pieChart = new ChartJS(pieCtx, {
                type: "doughnut",
                data: {
                    labels: Object.keys(productMap),
                    datasets: [{
                            data: Object.values(productMap)
                        }]
                }
            });
        }
    }
    /* INIT */
    const filter = document.getElementById("filter");
    function update(type) {
        const filtered = filterSales(type);
        renderStats(filtered);
        drawCharts(filtered);
    }
    filter.addEventListener("change", () => update(filter.value));
    setTimeout(() => update("today"), 100);
}
