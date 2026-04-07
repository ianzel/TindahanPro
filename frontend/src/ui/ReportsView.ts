import { ReportService } from "../services/ReportService.js";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
}

function endOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
}

export async function renderReports(root: HTMLElement) {
  const now = new Date();

  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  const weekStart = startOfDay(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6)
  );

  const weekEnd = todayEnd;

  const monthStart = startOfDay(
    new Date(now.getFullYear(), now.getMonth(), 1)
  );

  const monthEnd = todayEnd;

  const todaySales = await ReportService.salesBetween(todayStart, todayEnd);
  const weekSales = await ReportService.salesBetween(weekStart, weekEnd);
  const monthSales = await ReportService.salesBetween(monthStart, monthEnd);

  const sum = (arr: any[]) => ({
    sales: arr.reduce((s, x) => s + Number(x.totalAmount), 0),
    profit: arr.reduce((s, x) => s + Number(x.profit), 0),
    count: arr.length,
  });

  const t = sum(todaySales);
  const w = sum(weekSales);
  const m = sum(monthSales);

  root.innerHTML = `
    <h2>Reports</h2>

    <canvas id="salesChart" height="100"></canvas>

    <h3>Today</h3>
    <p>Transactions: ${t.count}</p>
    <p>Total Sales: ₱${t.sales.toFixed(2)}</p>

    <h3>Last 7 Days</h3>
    <p>Transactions: ${w.count}</p>
    <p>Total Sales: ₱${w.sales.toFixed(2)}</p>

    <h3>This Month</h3>
    <p>Transactions: ${m.count}</p>
    <p>Total Sales: ₱${m.sales.toFixed(2)}</p>
  `;

  // ✅ Chart
  const ctx = document.getElementById("salesChart") as HTMLCanvasElement;

  new (window as any).Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Today", "Last 7 Days", "This Month"],
      datasets: [
        {
          label: "Sales (₱)",
          data: [t.sales, w.sales, m.sales],
        },
      ],
    },
  });
}