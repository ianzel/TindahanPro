import { ProductService } from "../services/ProductService.js";

export async function renderProducts(root: HTMLElement) {
  const products = await ProductService.list();

  root.innerHTML = `
    <div class="card">
      <h2>Products</h2>

      <form id="product-form" class="horizontal-form">

        <input id="name" placeholder="Product Name" />
        
        <select id="category">
          <option>Beverages</option>
          <option>Snacks</option>
          <option>Canned Goods</option>
          <option>Instant Noodles</option>
          <option>Toiletries</option>
          <option>Others</option>
        </select>

        <input id="price" type="number" placeholder="Price" />
        <input id="stock" type="number" placeholder="Stock" />

        <button class="btn-primary" type="submit">Add</button>
      </form>
    </div>

    <div class="card">
      <h3>Product List</h3>

      <div class="product-table">
        <div class="product-header">
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Actions</span>
        </div>

        ${
          products.map((p: any) => `
            <div class="product-row">
              <span>${p.name}</span>
              <span>${p.category}</span>
              <span>₱${p.price}</span>
              <span>${p.stock}</span>

              <div class="actions">
                <button class="edit-btn" data-id="${p.id}">Edit</button>
                <button class="delete-btn" data-id="${p.id}">Delete</button>
              </div>
            </div>
          `).join("")
        }
      </div>
    </div>
  `;

  /* ADD PRODUCT */
  document.getElementById("product-form")!.onsubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      category: (document.getElementById("category") as HTMLSelectElement).value,
      price: Number((document.getElementById("price") as HTMLInputElement).value),
      stock: Number((document.getElementById("stock") as HTMLInputElement).value),
    };

    await ProductService.create(data);
    renderProducts(root);
  };

  /* EDIT */
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = Number((btn as HTMLElement).dataset.id);

      const name = prompt("New Name:");
      const price = prompt("New Price:");
      const stock = prompt("New Stock:");

      await fetch(`http://127.0.0.1:3000/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          stock: Number(stock)
        }),
      });

      renderProducts(root);
    });
  });

  /* DELETE */
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = Number((btn as HTMLElement).dataset.id);

      await fetch(`http://127.0.0.1:3000/products/${id}`, {
        method: "DELETE",
      });

      renderProducts(root);
    });
  });
}