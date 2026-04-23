import { ProductService } from "../services/ProductService.js";

export async function renderProducts(root: HTMLElement) {
  const products = await ProductService.list();

  root.innerHTML = `
  <!-- ADD PRODUCT -->
  <div class="card product-form-card">
    <h2>Products</h2>

    <form id="product-form" class="product-form">
      <input id="name" placeholder="Product Name" required />
      <input id="category" placeholder="Category" required />
      <input id="buying" type="number" placeholder="Buying Price" required />
      <input id="selling" type="number" placeholder="Selling Price" required />
      <input id="stock" type="number" placeholder="Stock" required />
      <input id="minStock" type="number" placeholder="Min Stock" required />

      <button type="submit">Add Product</button>
    </form>
  </div>

  <!-- PRODUCT TABLE -->
  <div class="card">
    <h3>Product List</h3>

    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody id="product-table"></tbody>
    </table>
  </div>
`;

  // =========================
  // ✅ FORM SUBMIT
  // =========================
  const form = document.getElementById("product-form") as HTMLFormElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const product = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      category: (document.getElementById("category") as HTMLInputElement).value,
      buyingPrice: Number((document.getElementById("buying") as HTMLInputElement).value),
      sellingPrice: Number((document.getElementById("selling") as HTMLInputElement).value),
      stock: Number((document.getElementById("stock") as HTMLInputElement).value),
      minStock: Number((document.getElementById("minStock") as HTMLInputElement).value),
    };

    await ProductService.add(product);

    // 🔥 refresh UI
    await renderProducts(root);
  });

  // =========================
  // ✅ RENDER TABLE
  // =========================
  const table = document.getElementById("product-table") as HTMLElement;

  if (products.length === 0) {
    table.innerHTML = `<tr><td colspan="5">No products yet</td></tr>`;
    return;
  }

  table.innerHTML = products.map((p: any) => {
    let status = "OK";
    let statusClass = "status-ok";

    if (p.stock <= 0) {
      status = "Out";
      statusClass = "status-out";
    } else if (p.stock <= p.minStock) {
      status = "Low";
      statusClass = "status-low";
    }

    return `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.stock}</td>
        <td>₱${p.sellingPrice}</td>
        <td class="${statusClass}">${status}</td>
      </tr>
    `;
  }).join("");
}