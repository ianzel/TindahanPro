export async function renderProducts(root: HTMLElement) {
  let products = JSON.parse(localStorage.getItem("products") || "[]");

  const oldModal = document.getElementById("editModal");
  if (oldModal) oldModal.remove();

  root.innerHTML = `
    <div class="card">
      <h2>Add Product</h2>

      <form id="form" class="horizontal-form"
        style="flex-direction: column; align-items: stretch; gap: 12px;">

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
            <option>Frozen Goods</option>
            <option>Condiments</option>
            <option>Instant Food</option>
            <option>Bakery</option>
          </select>
        </div>

        <div class="field">
          <label>Buy Price</label>
          <input id="buy" type="number" required />
        </div>

        <div class="field">
          <label>Sell Price</label>
          <input id="sell" type="number" required />
        </div>

        <div class="field">
          <label>Stock</label>
          <input id="stock" type="number" required />
        </div>

        <div class="field">
          <label>Min Stock</label>
          <input id="minStock" type="number" required />
        </div>

        <button type="submit" class="btn-primary" style="align-self:flex-end;">
          Add Product
        </button>
      </form>
    </div>

    <div class="card">
      <h3>Product List</h3>

      <div class="product-header" style="display:grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 120px; gap:10px;">
        <span>Name</span>
        <span>Category</span>
        <span>Buy</span>
        <span>Sell</span>
        <span>Stock</span>
        <span>Status</span>
        <span style="text-align:right;">Actions</span>
      </div>

      ${products.map((p: any, i: number) => {
        const buy = Number(p.buyPrice ?? 0);
        const sell = Number(p.sellPrice ?? 0);

        let status = "OK";
        let color = "#22c55e";

        if (p.stock <= 0) {
          status = "OUT";
          color = "#ef4444";
        } else if (p.stock <= p.minStock) {
          status = "LOW";
          color = "#f59e0b";
        }

        return `
          <div class="product-row" style="display:grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 120px; gap:10px; align-items:center;">
            <span>${p.name}</span>
            <span>${p.category}</span>
            <span>₱${buy}</span>
            <span>₱${sell}</span>
            <span>${p.stock}</span>

            <span style="color:${color}; font-weight:600;">
              ${status}
            </span>

            <div style="display:flex; justify-content:flex-end; gap:8px;">
              <button class="edit-btn" data-id="${i}">✏️</button>
              <button class="delete-btn" data-id="${i}">🗑</button>
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <div id="editModal" class="modal hidden">
      <div class="modal-content">
        <h3>Edit Product</h3>

        <div class="input-group">
          <label>Name</label>
          <input id="e_name" />
        </div>

        <div class="input-group">
          <label>Buy Price</label>
          <input id="e_buy" type="number" />
        </div>

        <div class="input-group">
          <label>Sell Price</label>
          <input id="e_sell" type="number" />
        </div>

        <div class="input-group">
          <label>Stock</label>
          <input id="e_stock" type="number" />
        </div>

       <div class="modal-actions" style="display:flex; justify-content:flex-end; gap:10px; margin-top:15px;">
  <button id="cancelEdit" class="btn-cancel">Cancel</button>
  <button id="saveEdit" class="btn-save">Save</button>
</div>
      </div>
    </div>
  `;

  /* ADD */
  document.getElementById("form")!.addEventListener("submit", (e) => {
    e.preventDefault();

    products.push({
      name: (document.getElementById("name") as HTMLInputElement).value,
      category: (document.getElementById("category") as HTMLSelectElement).value,
      buyPrice: Number((document.getElementById("buy") as HTMLInputElement).value),
      sellPrice: Number((document.getElementById("sell") as HTMLInputElement).value),
      stock: Number((document.getElementById("stock") as HTMLInputElement).value),
      minStock: Number((document.getElementById("minStock") as HTMLInputElement).value),
    });

    localStorage.setItem("products", JSON.stringify(products));
    renderProducts(root);
  });

  /* MODAL */
  const modal = document.getElementById("editModal")!;
  let editIndex = -1;

  root.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

    const editBtn = target.closest(".edit-btn") as HTMLElement;
    const deleteBtn = target.closest(".delete-btn") as HTMLElement;

    if (editBtn) {
      editIndex = Number(editBtn.dataset.id);
      const p = products[editIndex];

      (document.getElementById("e_name") as HTMLInputElement).value = p.name;
      (document.getElementById("e_buy") as HTMLInputElement).value = p.buyPrice;
      (document.getElementById("e_sell") as HTMLInputElement).value = p.sellPrice;
      (document.getElementById("e_stock") as HTMLInputElement).value = p.stock;

      modal.classList.remove("hidden");
    }

    if (deleteBtn) {
      products.splice(Number(deleteBtn.dataset.id), 1);
      localStorage.setItem("products", JSON.stringify(products));
      renderProducts(root);
    }
  });

  document.getElementById("cancelEdit")?.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  document.getElementById("saveEdit")?.addEventListener("click", () => {
    if (editIndex === -1) return;

    const p = products[editIndex];

    p.name = (document.getElementById("e_name") as HTMLInputElement).value;
    p.buyPrice = Number((document.getElementById("e_buy") as HTMLInputElement).value);
    p.sellPrice = Number((document.getElementById("e_sell") as HTMLInputElement).value);
    p.stock = Number((document.getElementById("e_stock") as HTMLInputElement).value);

    localStorage.setItem("products", JSON.stringify(products));

    modal.classList.add("hidden");
    renderProducts(root);
  });
}