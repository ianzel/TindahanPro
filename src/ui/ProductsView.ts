import { ProductService } from "../services/ProductService.js";

export async function renderProducts(root: HTMLElement) {
  try {
    const products = await ProductService.list();

    root.innerHTML = `
      <!-- ADD PRODUCT -->
      <div class="card product-form-card">
        <h2>Products</h2>

        <form id="product-form" class="product-form">
          <input id="name" placeholder="Product Name" required />
          <input id="category" placeholder="Category" required />
          <input id="buyingPrice" type="number" placeholder="Buying Price" required />
          <input id="sellingPrice" type="number" placeholder="Selling Price" required />
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

          <tbody id="product-table">
            ${products.map((p: any) => {
              let status = "OK";
              let statusClass = "status-ok";

              if (p.stock <= 0) {
                status = "Out of Stock";
                statusClass = "status-out";
              } else if (p.stock <= p.minStock) {
                status = "Low Stock";
                statusClass = "status-low";
              }

              return `
                <tr>
                  <td>${p.name}</td>
                  <td>${p.category}</td>
                  <td>${p.stock}</td>
                  <td>₱${Number(p.sellingPrice).toFixed(2)}</td>
                  <td class="${statusClass}">${status}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;

    /* ===== ADD PRODUCT FUNCTION ===== */
    const form = document.getElementById("product-form") as HTMLFormElement;

    form.onsubmit = async (e) => {
      e.preventDefault();

      try {
        const data = {
          name: (document.getElementById("name") as HTMLInputElement).value,
          category: (document.getElementById("category") as HTMLInputElement).value,
          buyingPrice: Number((document.getElementById("buyingPrice") as HTMLInputElement).value),
          sellingPrice: Number((document.getElementById("sellingPrice") as HTMLInputElement).value),
          stock: Number((document.getElementById("stock") as HTMLInputElement).value),
          minStock: Number((document.getElementById("minStock") as HTMLInputElement).value),
        };

        await ProductService.create(data);

        alert("Product added!");

        renderProducts(root); // refresh list

      } catch (err) {
        console.error(err);
        alert("Failed to add product");
      }
    };

  } catch (err) {
    console.error(err);

    root.innerHTML = `
      <div class="card">
        <h2 style="color:red;">Cannot load products</h2>
        <p>Check your backend server.</p>
      </div>
    `;
  }
}