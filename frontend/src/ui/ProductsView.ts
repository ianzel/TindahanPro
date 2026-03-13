import { Product } from "../models/Product.js";

const API_URL = "http://localhost:3000/products";

export async function renderProducts(root: HTMLElement): Promise<void> {
  let products: Product[] = [];

  try {
    const response = await fetch(API_URL);
    products = await response.json();
  } catch {
    root.innerHTML = `<p>Cannot load products from server.</p>`;
    return;
  }

  root.innerHTML = `
    <h2>Products</h2>

    <form id="product-form">
      <label>Product Name</label>
      <input id="p-name" required />

      <label>Category</label>
      <input id="p-category" required />

      <label>Buying Price</label>
      <input id="p-buy" type="number" min="0" step="0.01" required />

      <label>Selling Price</label>
      <input id="p-sell" type="number" min="0" step="0.01" required />

      <label>Stock</label>
      <input id="p-stock" type="number" min="0" required />

      <label>Minimum Stock</label>
      <input id="p-min" type="number" min="0" required />

      <button type="submit">Add Product</button>
    </form>

    <hr />

    <h3>Product List</h3>

    ${
      products.length === 0
        ? "<p>No products found.</p>"
        : `
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Buying Price</th>
                <th>Selling Price</th>
                <th>Stock</th>
                <th>Min Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${products.map((product) => `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.category}</td>
                  <td>₱${Number(product.buyingPrice).toFixed(2)}</td>
                  <td>₱${Number(product.sellingPrice).toFixed(2)}</td>
                  <td>${product.stock}</td>
                  <td>${product.minStock}</td>
                  <td>
                    <button class="delete-btn" data-id="${product.id}">Delete</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        `
    }
  `;

  const form = document.getElementById("product-form") as HTMLFormElement;

  form.onsubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      name: (document.getElementById("p-name") as HTMLInputElement).value.trim(),
      category: (document.getElementById("p-category") as HTMLInputElement).value.trim(),
      buyingPrice: Number((document.getElementById("p-buy") as HTMLInputElement).value),
      sellingPrice: Number((document.getElementById("p-sell") as HTMLInputElement).value),
      stock: Number((document.getElementById("p-stock") as HTMLInputElement).value),
      minStock: Number((document.getElementById("p-min") as HTMLInputElement).value)
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        const data = await response.json();
        alert(Array.isArray(data.message) ? data.message.join(", ") : "Failed to add product.");
        return;
      }

      await renderProducts(root);
    } catch {
      alert("Cannot connect to server.");
    }
  };

  root.querySelectorAll<HTMLButtonElement>(".delete-btn").forEach((button) => {
    button.onclick = async () => {
      const id = button.getAttribute("data-id");
      if (!id) return;

      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          alert("Failed to delete product.");
          return;
        }

        await renderProducts(root);
      } catch {
        alert("Cannot connect to server.");
      }
    };
  });
}