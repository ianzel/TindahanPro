import { ReportService } from "../services/ReportService.js";
export async function renderDashboard(root) {
    const summary = await ReportService.todaySummary();
    const lowStock = await ReportService.lowStockItems();
    const sales = await ReportService.getAllSales();
    root.innerHTML = `
    <h2>Dashboard</h2>

    <div class="grid">
      <div class="stat blue">
        <h3>Total Sales Today</h3>
        <p>₱${summary.totalSales.toFixed(2)}</p>
      </div>

      <div class="stat green">
        <h3>Total Profit</h3>
        <p>₱${summary.totalProfit.toFixed(2)}</p>
      </div>

      <div class="stat orange">
        <h3>Transactions</h3>
        <p>${summary.transactions}</p>
      </div>
    </div>

    <div style="display:grid; grid-template-columns: 2fr 1fr; gap:20px; margin-top:20px;">
      
      <div class="card">
        <h3>Sales Trend</h3>
        <canvas id="salesChart"></canvas>
      </div>

      <div class="card">
        <h3>Low Stock Items</h3>
        ${lowStock.length === 0
        ? "<p>No low stock items</p>"
        : `<ul>
                ${lowStock
            .map((p) => `<li>${p.name} (${p.stock})</li>`)
            .join("")}
              </ul>`}
      </div>

    </div>

    <div class="card">
      <h3>Sales Distribution</h3>
      <canvas id="pieChart"></canvas>
    </div>
  `;
    /* ===== SAFETY: wait for DOM ===== */
    setTimeout(() => {
        const ChartJS = window.Chart;
        if (!ChartJS) {
            console.error("Chart.js not loaded");
            return;
        }
        /* ===== LINE CHART ===== */
        const grouped = {};
        sales.forEach((s) => {
            const date = new Date(s.dateISO).toLocaleDateString();
            grouped[date] = (grouped[date] || 0) + Number(s.totalAmount);
        });
        const labels = Object.keys(grouped);
        const data = Object.values(grouped);
        const ctx = document.getElementById("salesChart");
        if (ctx) {
            new ChartJS(ctx, {
                type: "line",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Sales",
                            data,
                            borderWidth: 2,
                            tension: 0.3
                        }
                    ]
                }
            });
        }
        /* ===== PIE CHART ===== */
        const productMap = {};
        sales.forEach((s) => {
            const name = s.productName || "Unknown";
            productMap[name] = (productMap[name] || 0) + Number(s.totalAmount);
        });
        const pieLabels = Object.keys(productMap);
        const pieData = Object.values(productMap);
        const pieCtx = document.getElementById("pieChart");
        if (pieCtx) {
            new ChartJS(pieCtx, {
                type: "doughnut",
                data: {
                    labels: pieLabels,
                    datasets: [
                        {
                            data: pieData
                        }
                    ]
                }
            });
        }
    }, 100);
}
