import { ProductService } from "../services/ProductService.js";
import { SalesService } from "../services/SalesService.js";

export function renderSales(root: HTMLElement): void {
  const products = ProductService.list();

  root.innerHTML = `
    <h2>Sales</h2>

    ${
      products.length === 0
        ? `<p>⚠ Add products first before recording sales.</p>`
        : `
          <form id="sale-form">
            <label>Select Product</label>
            <select id="sale-product" required>
              ${products
                .map(
                  (product) =>
                    `<option value="${product.id}">${product.name} (Stock: ${product.stock})</option>`
                )
                .join("")}
            </select>

            <label>Quantity</label>
            <input id="sale-qty" type="number" min="1" step="1" required />

            <button type="submit">Record Sale</button>
          </form>

          <div id="sale-msg" style="margin-top:10px;"></div>
        `
    }
  `;

  const form = document.getElementById("sale-form") as HTMLFormElement | null;
  const msg = document.getElementById("sale-msg") as HTMLDivElement | null;

  if (!form || !msg) return;

  form.onsubmit = (event) => {
    event.preventDefault();

    try {
      const productId = Number(
        (document.getElementById("sale-product") as HTMLSelectElement).value
      );
      const qty = Number(
        (document.getElementById("sale-qty") as HTMLInputElement).value
      );

      const sale = SalesService.record(productId, qty);

      msg.innerHTML = `
        <p>✅ Sale recorded!</p>
        <p>Total: ₱${sale.totalAmount.toFixed(2)} | Profit: ₱${sale.profit.toFixed(2)}</p>
      `;

      renderSales(root);
    } catch (err) {
      msg.innerHTML = `<p>❌ ${(err as Error).message}</p>`;
    }
  };
}