import { ProductService } from "../services/ProductService.js";
import { SalesService } from "../services/SalesService.js";

export async function renderSales(root: HTMLElement) {
  const products = await ProductService.list();
  const sales = await SalesService.list();

  root.innerHTML = `
    <div class="card">
      <h2>Record Sale</h2>

      <form id="sale-form" class="form-grid">
        <select id="product">
          ${products.map((p: any) => `
            <option value="${p.id}">
              ${p.name} (Stock: ${p.stock})
            </option>
          `).join("")}
        </select>

        <input id="qty" type="number" placeholder="Quantity" required />
        <button type="submit">Record Sale</button>
      </form>

      <div id="msg"></div>
    </div>

    <div class="card">
      <h3>Sales History</h3>

      ${sales.map((s: any) => `
        <div class="sale-item">
          <strong>${s.productName || "Product"}</strong>
          <span>₱${Number(s.totalAmount).toFixed(2)}</span>
        </div>
      `).join("")}
    </div>
  `;

  const form = document.getElementById("sale-form") as HTMLFormElement;
  const msg = document.getElementById("msg") as HTMLDivElement;

  form.onsubmit = async (e) => {
    e.preventDefault();

    try {
      const productId = Number(
        (document.getElementById("product") as HTMLSelectElement).value
      );

      const qty = Number(
        (document.getElementById("qty") as HTMLInputElement).value
      );

      await SalesService.record(productId, qty);

      msg.innerHTML = `<p style="color:green;">Sale recorded!</p>`;

      renderSales(root); // refresh
    } catch (err) {
      msg.innerHTML = `<p style="color:red;">Error recording sale</p>`;
    }
  };
}