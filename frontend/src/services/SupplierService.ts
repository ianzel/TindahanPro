const API = "http://localhost:3000/suppliers";

export class SupplierService {

  static async list() {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Failed to load suppliers");
    }

    return res.json();
  }

  static async create(data: { name: string; contact: string }) {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create supplier");
    }

    return res.json();
  }

  static async delete(id: number) {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete supplier");
    }
  }
}