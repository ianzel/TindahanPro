export async function renderProducts(root: HTMLElement) {
  let products = JSON.parse(localStorage.getItem("products") || "[]");

  root.innerHTML = `
    <div class="card">
      <h2>Add Product</h2>

      <form id="form">

        <div class="field">
          <label>Product Name</label>
          <input id="name" required />
        </div>

        <div class="field">
          <label>Category</label>
          <select id="category">
            <option>Beverages</option>
            <option>Snacks</option>
            <option>Canned Goods</option>
            <option>Toiletries</option>
          </select>
        </div>

        <div class="field">
          <label>Buying Price</label>
          <input id="buy" type="number" required />
        </div>

        <div class="field">
          <label>Selling Price</label>
          <input id="sell" type="number" required />
        </div>

        <div class="field">
          <label>Stock</label>
          <input id="stock" type="number" required />
        </div>

        <button type="submit" class="btn-primary">Add Product</button>
      </form>
    </div>

    <div class="card">
      <h3>Product List</h3>

      <div class="product-header">
        <span>Name</span>
        <span>Category</span>
        <span>Buy</span>
        <span>Sell</span>
        <span>Stock</span>
        <span style="text-align:right;">Actions</span>
      </div>

      ${products.map((p: any, i: number) => `
        <div class="product-row">

          <span>${p.name}</span>
          <span>${p.category}</span>
          <span>₱${p.buy}</span>
          <span>₱${p.sell}</span>
          <span>${p.stock}</span>

          <!-- FORCE ACTIONS RIGHT EDGE -->
          <div class="actions" style="justify-content:flex-end;">
            <button class="icon-btn edit-btn" data-id="${i}">✏️</button>
            <button class="icon-btn delete-btn" data-id="${i}">🗑</button>
          </div>

        </div>
      `).join("")}
    </div>

    <!-- EDIT MODAL -->
    <div id="editModal" class="modal">
      <div class="modal-content">

        <h3>Edit Product</h3>

        <div class="field">
          <label>Product Name</label>
          <input id="e_name" />
        </div>

        <div class="field">
          <label>Buying Price</label>
          <input id="e_buy" type="number" />
        </div>

        <div class="field">
          <label>Selling Price</label>
          <input id="e_sell" type="number" />
        </div>

        <div class="field">
          <label>Stock</label>
          <input id="e_stock" type="number" />
        </div>

        <div class="modal-actions">
          <button id="cancelEdit" class="btn-cancel">Cancel</button>
          <button id="saveEdit" class="btn-save">Save</button>
        </div>

      </div>
    </div>
  `;

  /* =========================
     ADD PRODUCT
  ========================= */
  document.getElementById("form")!.addEventListener("submit", (e) => {
    e.preventDefault();

    products.push({
      name: (document.getElementById("name") as HTMLInputElement).value,
      category: (document.getElementById("category") as HTMLSelectElement).value,
      buy: Number((document.getElementById("buy") as HTMLInputElement).value),
      sell: Number((document.getElementById("sell") as HTMLInputElement).value),
      stock: Number((document.getElementById("stock") as HTMLInputElement).value),
    });

    localStorage.setItem("products", JSON.stringify(products));
    renderProducts(root);
  });

  /* =========================
     EVENTS (EDIT / DELETE)
  ========================= */
  const modal = document.getElementById("editModal")!;
  let editIndex = -1;

  root.onclick = (e) => {
    const target = e.target as HTMLElement;

    /* EDIT */
    if (target.classList.contains("edit-btn")) {
      editIndex = Number(target.dataset.id);

      const p = products[editIndex];

      (document.getElementById("e_name") as HTMLInputElement).value = p.name;
      (document.getElementById("e_buy") as HTMLInputElement).value = p.buy;
      (document.getElementById("e_sell") as HTMLInputElement).value = p.sell;
      (document.getElementById("e_stock") as HTMLInputElement).value = p.stock;

      modal.classList.add("show");
    }

    /* DELETE */
    if (target.classList.contains("delete-btn")) {
      const id = Number(target.dataset.id);
      products.splice(id, 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts(root);
    }

    /* CANCEL */
    if (target.id === "cancelEdit") {
      modal.classList.remove("show");
    }

    /* SAVE */
    if (target.id === "saveEdit") {
      products[editIndex].name = (document.getElementById("e_name") as HTMLInputElement).value;
      products[editIndex].buy = Number((document.getElementById("e_buy") as HTMLInputElement).value);
      products[editIndex].sell = Number((document.getElementById("e_sell") as HTMLInputElement).value);
      products[editIndex].stock = Number((document.getElementById("e_stock") as HTMLInputElement).value);

      localStorage.setItem("products", JSON.stringify(products));
      modal.classList.remove("show");
      renderProducts(root);
    }
  };
}