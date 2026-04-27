import { ReportService } from "../services/ReportService.js";

let salesChart: any = null;
let pieChart: any = null;

export async function renderDashboard(root: HTMLElement) {
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
        ${
          lowStock.length === 0
            ? "<p>No low stock items</p>"
            : `<ul>
                ${lowStock.map((p: any) => `<li>${p.name} (${p.stock})</li>`).join("")}
              </ul>`
        }
      </div>
    </div>

    <!-- PIE -->
    <div class="card chart-card">
      <h3>Sales Distribution</h3>
      <canvas id="pieChart"></canvas>
    </div>
  `;

  /* ===== FILTER ===== */
  function filterSales(type: string) {
    const now = new Date();

    if (type === "today") {
      return sales.filter((s: any) =>
        new Date(s.dateISO).toDateString() === now.toDateString()
      );
    }

    if (type === "week") {
      const d = new Date();
      d.setDate(now.getDate() - 7);
      return sales.filter((s: any) => new Date(s.dateISO) >= d);
    }

    if (type === "month") {
      const d = new Date();
      d.setMonth(now.getMonth() - 1);
      return sales.filter((s: any) => new Date(s.dateISO) >= d);
    }

    return sales;
  }

  /* ===== STATS ===== */
  function renderStats(filtered: any[]) {
    const totalSales = filtered.reduce((sum, s) => sum + Number(s.totalAmount || 0), 0);
    const totalProfit = filtered.reduce((sum, s) => sum + Number(s.profit || 0), 0);

    document.getElementById("stats")!.innerHTML = `
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
  function drawCharts(filtered: any[]) {
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;

    if (salesChart) salesChart.destroy();
    if (pieChart) pieChart.destroy();

    /* LINE */
    const grouped: Record<string, number> = {};
    filtered.forEach((s: any) => {
      const d = new Date(s.dateISO).toLocaleDateString();
      grouped[d] = (grouped[d] || 0) + Number(s.totalAmount);
    });

    const ctx = document.getElementById("salesChart") as HTMLCanvasElement;

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
    const productMap: Record<string, number> = {};
    filtered.forEach((s: any) => {
      const name = s.productName || "Unknown";
      productMap[name] = (productMap[name] || 0) + Number(s.totalAmount);
    });

    const pieCtx = document.getElementById("pieChart") as HTMLCanvasElement;

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
  const filter = document.getElementById("filter") as HTMLSelectElement;

  function update(type: string) {
    const filtered = filterSales(type);
    renderStats(filtered);
    drawCharts(filtered);
  }

  filter.addEventListener("change", () => update(filter.value));

  setTimeout(() => update("today"), 100);
}