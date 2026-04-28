export async function renderProducts(root) {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    root.innerHTML = `
    <div class="card">
      <h2>Add Product</h2>

      <!-- VERTICAL FORM FIX -->
      <form id="form" class="horizontal-form" style="flex-direction: column; align-items: stretch; gap: 12px;">

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

      <div class="product-header" style="display:grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 120px; gap:10px; align-items:center;">
        <span>Name</span>
        <span>Category</span>
        <span>Buy</span>
        <span>Sell</span>
        <span>Stock</span>
        <span>Status</span>
        <span style="text-align:right;">Actions</span>
      </div>

      ${products
        .map((p, i) => {
        let status = "OK";
        let statusColor = "#22c55e";
        if (p.stock <= 0) {
            status = "OUT";
            statusColor = "#ef4444";
        }
        else if (p.stock <= p.minStock) {
            status = "LOW";
            statusColor = "#f59e0b";
        }
        return `
          <div class="product-row" style="display:grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 120px; gap:10px; align-items:center; padding:10px 0; border-bottom:1px solid #f1f5f9;">
            
            <span>${p.name}</span>
            <span>${p.category}</span>
            <span>₱${p.buy}</span>
            <span>₱${p.sell}</span>
            <span>${p.stock}</span>

            <!-- STATUS -->
            <span style="font-weight:600; color:${statusColor}">
              ${status}
            </span>

            <!-- ACTIONS (RIGHT ALIGNED FIX) -->
            <div class="actions" style="display:flex; justify-content:flex-end; gap:8px;">
              <button class="icon-btn edit-btn" data-id="${i}" style="color:#2563eb;">✏️</button>
             <button class="icon-btn delete-btn" data-id="${i}" title="Delete">🗑</button>
            </div>
          </div>
        `;
    })
        .join("")}
    </div>

    <!-- EDIT MODAL -->
    <div id="editModal" class="modal">
      <div class="modal-content">
        <h3>Edit Product</h3>

        <div class="input-group">
          <label>Product Name</label>
          <input id="e_name" />
        </div>

        <div class="input-group">
          <label>Buying Price</label>
          <input id="e_buy" type="number" />
        </div>

        <div class="input-group">
          <label>Selling Price</label>
          <input id="e_sell" type="number" />
        </div>

        <div class="input-group">
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
    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        products.push({
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            buy: Number(document.getElementById("buy").value),
            sell: Number(document.getElementById("sell").value),
            stock: Number(document.getElementById("stock").value),
            minStock: Number(document.getElementById("minStock").value),
        });
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts(root);
    });
    /* =========================
       MODAL + ACTIONS
    ========================= */
    const modal = document.getElementById("editModal");
    let editIndex = -1;
    root.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("edit-btn")) {
            editIndex = Number(target.dataset.id);
            const p = products[editIndex];
            document.getElementById("e_name").value = p.name;
            document.getElementById("e_buy").value = p.buy;
            document.getElementById("e_sell").value = p.sell;
            document.getElementById("e_stock").value = p.stock;
            modal.classList.add("show");
        }
        if (target.classList.contains("delete-btn")) {
            const id = Number(target.dataset.id);
            products.splice(id, 1);
            localStorage.setItem("products", JSON.stringify(products));
            renderProducts(root);
        }
        if (target.id === "cancelEdit") {
            modal.classList.remove("show");
        }
        if (target.id === "saveEdit") {
            products[editIndex].name = document.getElementById("e_name").value;
            products[editIndex].buy = Number(document.getElementById("e_buy").value);
            products[editIndex].sell = Number(document.getElementById("e_sell").value);
            products[editIndex].stock = Number(document.getElementById("e_stock").value);
            localStorage.setItem("products", JSON.stringify(products));
            modal.classList.remove("show");
            renderProducts(root);
        }
    });
}
