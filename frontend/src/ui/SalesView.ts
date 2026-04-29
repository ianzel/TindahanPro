export async function renderSales(root: HTMLElement) {
  let products = JSON.parse(localStorage.getItem("products") || "[]");
  let sales = JSON.parse(localStorage.getItem("sales") || "[]");

  const getStockClass = (stock: number, minStock: number) => {
    if (stock === 0) return "status-out";
    if (stock <= minStock) return "status-low";
    return "status-ok";
  };

  root.innerHTML = `
    <div class="card">
      <h2>Record Sale</h2>

      <form id="sale-form" class="sales-form">

        <div class="form-group">
          <label>Product</label>
          <select id="product">
            ${products.map((p: any, i: number) => `
              <option value="${i}">
                ${p.name} (${p.stock} stock)
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

        ${
          sales.length === 0
            ? `<p style="margin-top:10px;">No sales yet</p>`
            : sales.map((s: any) => `
              <div class="sales-row">
                <span>${s.productName}</span>
                <span>${s.quantity}</span>
                <span>₱${Number(s.total).toFixed(2)}</span>
                <span>${new Date(s.date).toLocaleDateString()}</span>
              </div>
            `).join("")
        }
      </div>
    </div>
  `;

  const form = document.getElementById("sale-form") as HTMLFormElement;
  const msg = document.getElementById("msg") as HTMLDivElement;

  form.onsubmit = (e) => {
    e.preventDefault();

    const productIndex = Number(
      (document.getElementById("product") as HTMLSelectElement).value
    );

    const qty = Number(
      (document.getElementById("qty") as HTMLInputElement).value
    );

    if (!qty || qty <= 0) {
      msg.innerHTML = `<p style="color:red;">Invalid quantity</p>`;
      return;
    }

    const product = products[productIndex];

    if (qty > product.stock) {
      msg.innerHTML = `<p style="color:red;">Not enough stock</p>`;
      return;
    }

    /* UPDATE STOCK */
    product.stock -= qty;

    /* RECORD SALE */
    sales.push({
      productName: product.name,
      quantity: qty,
      total: qty * product.sell,
      date: new Date().toISOString(),
    });

    /* SAVE */
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("sales", JSON.stringify(sales));

    msg.innerHTML = `<p style="color:green;">Sale recorded!</p>`;

    renderSales(root);
  };
}