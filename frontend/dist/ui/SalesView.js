import { ProductService } from "../services/ProductService.js";
import { SalesService } from "../services/SalesService.js";
export async function renderSales(root) {
    let products = await ProductService.list();
    let sales = await SalesService.list();
    let filteredDate = "";
    const refreshData = async () => {
        products = await ProductService.list();
        sales = await SalesService.list();
    };
    const getFilteredSales = () => {
        if (!filteredDate)
            return sales;
        return sales.filter((s) => {
            const date = new Date(s.dateISO).toISOString().split("T")[0];
            return date === filteredDate;
        });
    };
    const render = () => {
        const filtered = getFilteredSales();
        root.innerHTML = `
      <div class="card">
        <h2>Record Sale</h2>

        <form id="sale-form" class="sales-form">

          <div class="form-group">
            <label>Product</label>
            <select id="product">
              ${products.map((p) => `
                <option value="${p.id}">
                  ${p.name} (${p.stock} stock)
                </option>
              `).join("")}
            </select>
          </div>

          <div class="form-group">
            <label>Quantity</label>
            <input id="qty" type="number" />
          </div>

          <button type="submit" class="btn-primary">Record Sale</button>
        </form>
      </div>

      <div class="card">

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>Sales History</h3>

          <div style="display:flex; gap:10px; align-items:center;">
            <input id="dateFilter" type="date"
              value="${filteredDate || ""}"
              style="min-width:160px; padding:6px; border:1px solid #ddd; border-radius:6px;"
            />
            <button id="resetBtn" class="btn-cancel">Reset</button>
          </div>
        </div>

        <div class="sales-table">
          <div class="sales-header">
            <span>Product</span>
            <span>Qty</span>
            <span>Total</span>
            <span>Date</span>
          </div>

          ${filtered.length === 0
            ? `<p style="margin-top:10px;">No sales found</p>`
            : filtered.map((s) => `
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
        attachEvents();
    };
    const attachEvents = () => {
        const form = document.getElementById("sale-form");
        const dateInput = document.getElementById("dateFilter");
        const resetBtn = document.getElementById("resetBtn");
        form.onsubmit = async (e) => {
            e.preventDefault();
            const productId = Number(document.getElementById("product").value);
            const qty = Number(document.getElementById("qty").value);
            if (!qty || qty <= 0)
                return alert("Invalid quantity");
            // 1. record sale
            await SalesService.record(productId, qty);
            // 2. refresh products + sales
            await refreshData();
            // 3. update UI
            render();
        };
        dateInput?.addEventListener("change", () => {
            filteredDate = dateInput.value;
            render();
        });
        resetBtn?.addEventListener("click", () => {
            filteredDate = "";
            render();
        });
    };
    render();
}
