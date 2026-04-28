import { ProductService } from "../services/ProductService.js";
import { SalesService } from "../services/SalesService.js";
export async function renderSales(root) {
    const products = await ProductService.list();
    const sales = await SalesService.list();
    root.innerHTML = `
    <div class="card">
      <h2>Record Sale</h2>

      <form id="sale-form" class="sales-form">

        <div class="form-group">
          <label>Product</label>
          <select id="product">
            ${products.map((p) => `
              <option value="${p.id}">
                ${p.name} (Stock: ${p.stock})
              </option>
            `).join("")}
          </select>
        </div>

        <div class="form-group">
          <label>Quantity</label>
          <input id="qty" type="number" placeholder="Enter quantity" />
        </div>

        <button type="submit" class="btn-primary">Record Sale</button>
      </form>

      <div id="msg"></div>
    </div>

    <div class="card">
      <h3>Sales History</h3>

      <div class="sales-table">
        <div class="sales-header">
          <span>Product</span>
          <span>Qty</span>
          <span>Total</span>
          <span>Date</span>
        </div>

        ${sales.length === 0
        ? `<p>No sales yet</p>`
        : sales.map((s) => `
              <div class="sales-row">
                <span>${s.productName}</span>
                <span>${s.quantity}</span>
                <span>₱${Number(s.totalAmount).toFixed(2)}</span>
                <span>${new Date(s.dateISO).toLocaleDateString()}</span>
              </div>
            `).join("")}
      </div>
    </div>
  `;
    const form = document.getElementById("sale-form");
    const msg = document.getElementById("msg");
    form.onsubmit = async (e) => {
        e.preventDefault();
        const productId = Number(document.getElementById("product").value);
        const qty = Number(document.getElementById("qty").value);
        if (!qty || qty <= 0) {
            msg.innerHTML = `<p style="color:red;">Invalid quantity</p>`;
            return;
        }
        try {
            await SalesService.record(productId, qty);
            msg.innerHTML = `<p style="color:green;">Sale recorded!</p>`;
            renderSales(root);
        }
        catch (err) {
            msg.innerHTML = `<p style="color:red;">${err.message}</p>`;
        }
    };
}
