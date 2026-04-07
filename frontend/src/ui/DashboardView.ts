import { ReportService } from "../services/ReportService.js";

export async function renderDashboard(root: HTMLElement): Promise<void> {
  const summary = await ReportService.todaySummary();
  const lowStock = await ReportService.lowStockItems();
  const best = await ReportService.bestSellingProducts();

  root.innerHTML = `
    <div class="card">
      <h2>Dashboard Overview</h2>
    </div>

    <div class="grid">
      <div class="stat blue">
        <h3>Total Sales</h3>
        <p>₱${summary.totalSales.toFixed(2)}</p>
      </div>

      <div class="stat green">
        <h3>Profit</h3>
        <p>₱${summary.totalProfit.toFixed(2)}</p>
      </div>

      <div class="stat orange">
        <h3>Transactions</h3>
        <p>${summary.transactions}</p>
      </div>
    </div>

    <div class="card">
      <h3>Best Selling Products</h3>
      <canvas id="salesChart"></canvas>
    </div>

    <div class="card">
      <h3>Low Stock</h3>
      ${
        lowStock.length === 0
          ? "<p style='color:green;'>✔ All good</p>"
          : lowStock.map((p: any) => `
              <p style="color:red;">⚠ ${p.name} (${p.stock})</p>
            `).join("")
      }
    </div>
  `;

  const canvas = document.getElementById("salesChart") as HTMLCanvasElement;

  if (!canvas || !(window as any).Chart) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  new (window as any).Chart(ctx, {
    type: "pie",
    data: {
      labels: best.map((b: any) => b.name),
      datasets: [
        {
          data: best.map((b: any) => b.quantity),
        },
      ],
    },
  });
}