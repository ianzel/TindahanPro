import { ProductService } from "../services/ProductService.js";
import { SalesService } from "../services/SalesService.js";

export async function renderSales(root: HTMLElement) {
  let filteredDate = "";

  const getData = async () => {
    return {
      products: await ProductService.list(),
      sales: await SalesService.list(),
    };
  };

  let { products, sales } = await getData();

  const refresh = async () => {
    const data = await getData();
    products = data.products;
    sales = data.sales;
  };

  const getFiltered = () => {
    if (!filteredDate) return sales;

    return sales.filter((s: any) => {
      const d = new Date(s.dateISO).toISOString().split("T")[0];
      return d === filteredDate;
    });
  };

  const render = async () => {
    await refresh();

    const filtered = getFiltered();

    root.innerHTML = `
      <div class="card">
        <h2>Record Sale</h2>

        <form id="sale-form" class="sales-form">

          <div class="form-group">
            <label>Product</label>
            <select id="product">
              ${
                products.length === 0
                  ? `<option disabled>No products</option>`
                  : products.map((p: any, i: number) => `
                      <option value="${i}">
                        ${p.name} (${p.stock})
                      </option>
                    `).join("")
              }
            </select>
          </div>

          <div class="form-group">
            <label>Quantity</label>
            <input id="qty" type="number" min="1" />
          </div>

          <button type="submit" class="btn-primary">Record Sale</button>
        </form>
      </div>

      <div class="card">

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>Sales History</h3>

          <div style="display:flex; gap:10px; align-items:center;">
            <input id="dateFilter" type="date" value="${filteredDate}" />
            <button id="resetBtn">Reset</button>
          </div>
        </div>

        <!-- HEADER -->
        <div style="
          display:grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          font-weight:bold;
          margin-top:10px;
          border-bottom:1px solid #ddd;
          padding-bottom:6px;
        ">
          <span>Product</span>
          <span>Qty</span>
          <span>Price</span>
          <span>Total</span>
          <span style="text-align:right;">Date</span>
        </div>

        ${
          filtered.length === 0
            ? `<p style="margin-top:10px;">No sales</p>`
            : filtered.map((s: any) => `
                <div style="
                  display:grid;
                  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
                  padding:8px 0;
                  border-bottom:1px solid #f1f5f9;
                  align-items:center;
                ">
                  <span>${s.productName}</span>
                  <span>${s.quantity}</span>
                  <span>₱${s.unitPrice}</span>
                  <span>₱${s.totalAmount}</span>
                  <span style="text-align:right;">
                    ${new Date(s.dateISO).toLocaleDateString()}
                  </span>
                </div>
              `).join("")
        }

      </div>
    `;

    attach();
  };

  const attach = () => {
    document.getElementById("sale-form")!.addEventListener("submit", async (e) => {
      e.preventDefault();

      const productIndex = Number(
        (document.getElementById("product") as HTMLSelectElement).value
      );

      const qty = Number(
        (document.getElementById("qty") as HTMLInputElement).value
      );

      await SalesService.record(productIndex, qty);

      render();
    });

    document.getElementById("dateFilter")?.addEventListener("change", (e: any) => {
      filteredDate = e.target.value;
      render();
    });

    document.getElementById("resetBtn")?.addEventListener("click", () => {
      filteredDate = "";
      render();
    });
  };

  render();
}