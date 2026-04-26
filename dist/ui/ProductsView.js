import { ProductService } from "../services/ProductService.js";
export async function renderProducts(root) {
    const products = await ProductService.list();
    root.innerHTML = `
    <div class="card">
      <h2>Products</h2>

      <form id="product-form">
        <input id="name" placeholder="Product Name" required />
        <input id="category" placeholder="Category" required />
        <input id="buy" type="number" placeholder="Buying Price" required />
        <input id="sell" type="number" placeholder="Selling Price" required />
        <input id="stock" type="number" placeholder="Stock" required />
        <input id="min" type="number" placeholder="Min Stock" required />

        <button type="submit">Add Product</button>
      </form>
    </div>

    <div class="card">
      <h3>Product List</h3>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${products.map((p) => `
            <tr>
              <td>${p.name}</td>
              <td>${p.stock}</td>
              <td>₱${Number(p.sellingPrice).toFixed(2)}</td>
              <td>
                ${p.stock <= 0
        ? `<span class="status-out">Out</span>`
        : p.stock <= p.minStock
            ? `<span class="status-low">Low</span>`
            : `<span class="status-ok">OK</span>`}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
    const form = document.getElementById("product-form");
    form.onsubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById("name").value,
            category: document.getElementById("category").value,
            buyingPrice: Number(document.getElementById("buy").value),
            sellingPrice: Number(document.getElementById("sell").value),
            stock: Number(document.getElementById("stock").value),
            minStock: Number(document.getElementById("min").value),
        };
        try {
            await ProductService.create(data);
            renderProducts(root); // refresh
        }
        catch {
            alert("Failed to add product");
        }
    };
}
