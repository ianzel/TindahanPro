import { ReportService } from "../services/ReportService.js";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0);
}

function endOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59);
}

export function renderReports(root: HTMLElement) {
  const now = new Date();

  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  const weekStart = startOfDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6));
  const weekEnd = todayEnd;

  const monthStart = startOfDay(new Date(now.getFullYear(), now.getMonth(), 1));
  const monthEnd = todayEnd;

  const todaySales = ReportService.salesBetween(todayStart, todayEnd);
  const weekSales = ReportService.salesBetween(weekStart, weekEnd);
  const monthSales = ReportService.salesBetween(monthStart, monthEnd);

  const sum = (arr: { totalAmount: number; profit: number }[]) => ({
    sales: arr.reduce((s, x) => s + x.totalAmount, 0),
    profit: arr.reduce((s, x) => s + x.profit, 0),
    count: arr.length
  });

  const t = sum(todaySales);
  const w = sum(weekSales);
  const m = sum(monthSales);

  root.innerHTML = `
    <h2>Reports</h2>

    <h3>Today</h3>
    <p>Transactions: ${t.count}</p>
    <p>Total Sales: ₱${t.sales.toFixed(2)}</p>
    <p>Total Profit: ₱${t.profit.toFixed(2)}</p>

    <h3>Last 7 Days</h3>
    <p>Transactions: ${w.count}</p>
    <p>Total Sales: ₱${w.sales.toFixed(2)}</p>
    <p>Total Profit: ₱${w.profit.toFixed(2)}</p>

    <h3>This Month</h3>
    <p>Transactions: ${m.count}</p>
    <p>Total Sales: ₱${m.sales.toFixed(2)}</p>
    <p>Total Profit: ₱${m.profit.toFixed(2)}</p>
  `;
}