import { ReportService } from "../services/ReportService.js";
export async function renderReports(root) {
    const summary = await ReportService.todaySummary();
    root.innerHTML = `
    <div class="grid">
      <div class="stat blue">
        <h3>Sales</h3>
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
      <h3>Report Chart</h3>
      <canvas id="reportChart"></canvas>
    </div>
  `;
    setTimeout(() => {
        const ChartJS = window.Chart;
        if (!ChartJS)
            return;
        new ChartJS(document.getElementById("reportChart"), {
            type: "bar",
            data: {
                labels: ["Sales", "Profit"],
                datasets: [{
                        data: [summary.totalSales, summary.totalProfit]
                    }]
            }
        });
    }, 100);
}
