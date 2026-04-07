import { ProductService } from "../services/ProductService.js";
import { SalesService } from "../services/SalesService.js";

export async function renderSales(root: HTMLElement) {
  const products = await ProductService.list();

  root.innerHTML = `
    <h2>Sales</h2>

    <form id="sale-form">
      <select id="product">
        ${products
          .map(
            (p: any) => `
          <option value="${p.id}">
            ${p.name}
          </option>
        `
          )
          .join("")}
      </select>

      <input id="qty" type="number" min="1" required />

      <button type="submit">Record</button>
    </form>

    <div id="msg"></div>
  `;

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

    try {
      const sale = await SalesService.record(productId, qty);

      msg.innerHTML = `
        <p>✅ Sale recorded</p>
        <p>Total: ₱${sale.totalAmount}</p>
      `;
    } catch (err) {
      msg.innerHTML = `<p>❌ Error</p>`;
    }
  };
}