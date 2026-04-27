import { ReportService } from "../services/ReportService.js";

let reportChart: any = null;

export async function renderReports(root: HTMLElement) {
  const sales = await ReportService.getAllSales();

  root.innerHTML = `
    <div class="filter-bar">
      <h2>Reports</h2>

      <select id="report-filter">
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>

    <!-- CONNECTED STATS -->
    <div class="stats-row" id="report-stats"></div>

    <!-- CONNECTED CHART -->
    <div class="card">
      <h3>Sales & Profit Overview</h3>
      <canvas id="reportChart"></canvas>
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
    const totalSales = filtered.reduce(
      (sum: number, s: any) => sum + Number(s.totalAmount),
      0
    );

    const totalProfit = filtered.reduce(
      (sum: number, s: any) => sum + Number(s.profit),
      0
    );

    const statsEl = document.getElementById("report-stats")!;

    statsEl.innerHTML = `
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

  /* ===== CHART ===== */
  function drawChart(filtered: any[]) {
    const ChartJS = (window as any).Chart;
    if (!ChartJS) return;

    if (reportChart) reportChart.destroy();

    const totalSales = filtered.reduce(
      (sum: number, s: any) => sum + Number(s.totalAmount),
      0
    );

    const totalProfit = filtered.reduce(
      (sum: number, s: any) => sum + Number(s.profit),
      0
    );

    const ctx = document.getElementById("reportChart") as HTMLCanvasElement;

    if (ctx) {
      reportChart = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: ["Sales", "Profit"],
          datasets: [
            {
              data: [totalSales, totalProfit]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }

  /* ===== INIT ===== */
  const filter = document.getElementById("report-filter") as HTMLSelectElement;

  function update(type: string) {
    const filtered = filterSales(type);
    renderStats(filtered);
    drawChart(filtered);
  }

  filter.addEventListener("change", () => {
    update(filter.value);
  });

  update("today");
}