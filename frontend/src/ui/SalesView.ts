import { ProductService } from "../services/ProductService.js";
import { SalesService } from "../services/SalesService.js";

export async function renderSales(root: HTMLElement) {
  const products = await ProductService.list();
  const sales = await SalesService.list();

  root.innerHTML = `
    <!-- ===== RECORD SALE ===== -->
    <div class="card">
      <h2>Record Sale</h2>

      <form id="sale-form" class="horizontal-form">

        <div class="form-group">
          <label>Product</label>
          <select id="product">
            ${products.map((p: any) => `
              <option value="${p.id}">
                ${p.name} (Stock: ${p.stock})
              </option>
            `).join("")}
          </select>
        </div>

        <div class="form-group">
          <label>Quantity</label>
          <input id="qty" type="number" placeholder="Enter quantity" required />
        </div>

        <button type="submit" class="btn-primary">
          Record
        </button>
      </form>

      <div id="msg"></div>
    </div>

    <!-- ===== SALES HISTORY ===== -->
    <div class="card">
      <h3>Sales History</h3>

      ${
        sales.length === 0
          ? "<p>No sales yet</p>"
          : `
            <div class="sales-table">
              
              <div class="sales-header">
                <span>Product</span>
                <span>Qty</span>
                <span>Total</span>
                <span>Date</span>
              </div>

              ${sales.map((s: any) => `
                <div class="sales-row">
                  <span>${s.productName}</span>
                  <span>${s.quantity}</span>
                  <span>₱${Number(s.totalAmount).toFixed(2)}</span>
                  <span>${new Date(s.dateISO).toLocaleDateString()}</span>
                </div>
              `).join("")}

            </div>
          `
      }
    </div>
  `;

  /* ===== FORM ===== */
  const form = document.getElementById("sale-form") as HTMLFormElement;
  const msg = document.getElementById("msg") as HTMLDivElement;

  form.onsubmit = async (e) => {
    e.preventDefault();

    const productId = Number(
      (document.getElementById("product") as HTMLSelectElement).value
    );

    const qty = Number(
      (document.getElementById("qty") as HTMLInputElement).value
    );

    if (qty <= 0) {
      msg.innerHTML = `<p style="color:red;">Invalid quantity</p>`;
      return;
    }

    try {
      await SalesService.record(productId, qty);

      msg.innerHTML = `<p style="color:green;">Sale recorded!</p>`;

      renderSales(root); // refresh
    } catch (err: any) {
      msg.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
  };
}