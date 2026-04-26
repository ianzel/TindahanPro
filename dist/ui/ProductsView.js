import { ProductService } from "../services/ProductService.js";
export async function renderProducts(root) {
    root.innerHTML = `<p>Loading products...</p>`;
    const products = await ProductService.list();
    root.innerHTML = `
    <div class="card">
      <h2>Products</h2>

      <form id="product-form">
        <input id="name" placeholder="Name" required />
        <input id="category" placeholder="Category" required />
        <input id="buyingPrice" type="number" placeholder="Buying Price" required />
        <input id="sellingPrice" type="number" placeholder="Selling Price" required />
        <input id="stock" type="number" placeholder="Stock" required />
        <input id="minStock" type="number" placeholder="Min Stock" required />

        <button type="submit">Add Product</button>
      </form>
    </div>

    <div class="card">
      <h3>Product List</h3>

      <ul>
        ${products.length === 0
        ? "<li>No products yet</li>"
        : products
            .map((p) => `<li>${p.name} - Stock: ${p.stock}</li>`)
            .join("")}
      </ul>
    </div>
  `;
    const form = document.getElementById("product-form");
    form.onsubmit = async (e) => {
        e.preventDefault();
        try {
            await ProductService.create({
                name: document.getElementById("name").value,
                category: document.getElementById("category").value,
                buyingPrice: Number(document.getElementById("buyingPrice").value),
                sellingPrice: Number(document.getElementById("sellingPrice").value),
                stock: Number(document.getElementById("stock").value),
                minStock: Number(document.getElementById("minStock").value),
            });
            renderProducts(root); // refresh
        }
        catch {
            alert("Error saving product");
        }
    };
}
