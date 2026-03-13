import { ReportService } from "../services/ReportService.js";

export function renderDashboard(root: HTMLElement): void {
  const summary = ReportService.todaySummary();
  const lowStock = ReportService.lowStockItems();

  root.innerHTML = `
    <section class="card">
      <h2>Dashboard</h2>
      <p>Welcome to TindahanPro.</p>
    </section>

    <section class="grid">
      <div class="stat">
        <h3>Total Sales Today</h3>
        <p>₱${summary.totalSales.toFixed(2)}</p>
      </div>

      <div class="stat">
        <h3>Total Profit Today</h3>
        <p>₱${summary.totalProfit.toFixed(2)}</p>
      </div>

      <div class="stat">
        <h3>Transactions</h3>
        <p>${summary.transactions}</p>
      </div>

      <div class="stat">
        <h3>Low Stock Items</h3>
        <p>${summary.lowStockCount}</p>
      </div>

      <div class="stat">
        <h3>Inventory Value</h3>
        <p>₱${summary.inventoryValue.toFixed(2)}</p>
      </div>
    </section>

    <section class="card">
      <h3>Low Stock Alert</h3>
      ${
        lowStock.length === 0
          ? `<p>No low-stock items.</p>`
          : `
            <ul>
              ${lowStock
                .map(
                  (product) => `
                    <li>
                      ${product.name} - Stock: ${product.stock} / Minimum: ${product.minStock}
                    </li>
                  `
                )
                .join("")}
            </ul>
          `
      }
    </section>
  `;
}