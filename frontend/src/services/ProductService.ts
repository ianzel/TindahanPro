const API = "http://localhost:3000/products"; // try this

export class ProductService {
  static async list() {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Cannot load product from server");
    }

    return res.json();
  }

  static async getById(id: number) {
    const res = await fetch(`${API}/${id}`);

    if (!res.ok) {
      throw new Error("Product not found");
    }

    return res.json();
  }

  static async add(product: any) {
    return fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  }

  static async update(product: any) {
    return fetch(`${API}/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  }

  static async remove(id: number) {
    return fetch(`${API}/${id}`, {
      method: "DELETE",
    });
  }
}