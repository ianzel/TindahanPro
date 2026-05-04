import { ReportService } from "../services/ReportService.js";
let reportChart = null;
export async function renderReports(root) {
    const sales = await ReportService.getAllSales();
    /* ================= SAFE DATE ================= */
    const getSafeDate = (s) => {
        const raw = s.created_at || s.dateISO || s.date;
        const d = new Date(raw);
        return isNaN(d.getTime()) ? null : d;
    };
    root.innerHTML = `
    <div class="filter-bar">
      <h2>Reports</h2>

      <select id="report-filter">
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>

    <div class="stats-row" id="report-stats"></div>

    <div class="card">
      <h3>Sales & Profit Overview</h3>
      <canvas id="reportChart"></canvas>
    </div>
  `;
    /* ================= FILTER ================= */
    function filterSales(type) {
        const now = new Date();
        return sales.filter((s) => {
            const date = getSafeDate(s);
            if (!date)
                return false;
            if (type === "today") {
                return date.toDateString() === now.toDateString();
            }
            if (type === "week") {
                const d = new Date();
                d.setDate(now.getDate() - 7);
                return date.getTime() >= d.getTime();
            }
            if (type === "month") {
                const d = new Date();
                d.setMonth(now.getMonth() - 1);
                return date.getTime() >= d.getTime();
            }
            return true;
        });
    }
    /* ================= STATS ================= */
    function renderStats(filtered) {
        const totalSales = filtered.reduce((sum, s) => sum + Number(s.totalAmount || 0), 0);
        const totalProfit = filtered.reduce((sum, s) => sum + Number(s.profit || 0), 0);
        const statsEl = document.getElementById("report-stats");
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
    /* ================= CHART ================= */
    function drawChart(filtered) {
        const ChartJS = window.Chart;
        if (!ChartJS)
            return;
        if (reportChart)
            reportChart.destroy();
        const totalSales = filtered.reduce((sum, s) => sum + Number(s.totalAmount || 0), 0);
        const totalProfit = filtered.reduce((sum, s) => sum + Number(s.profit || 0), 0);
        const ctx = document.getElementById("reportChart");
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
    /* ================= UPDATE ================= */
    const filter = document.getElementById("report-filter");
    function update(type) {
        const filtered = filterSales(type);
        renderStats(filtered);
        drawChart(filtered);
    }
    filter.addEventListener("change", () => {
        update(filter.value);
    });
    /* ================= INIT ================= */
    update("today");
}
