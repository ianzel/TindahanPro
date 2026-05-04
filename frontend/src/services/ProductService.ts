const API = "http://localhost:3000/products";

export class ProductService {

  // 🔥 GET FROM DATABASE (NO CACHE)
  static async list() {
    const res = await fetch(API, {
      cache: "no-store", // ✅ FIX 304
    });

    const data = await res.json();

    return data.map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      buyPrice: Number(p.buyingPrice),
      sellPrice: Number(p.sellingPrice),
      stock: p.stock,
      minStock: p.minStock,
    }));
  }

  // 🔥 CREATE (SAVE TO DB)
  static async create(data: any) {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        category: data.category,
        buyingPrice: data.buyPrice,
        sellingPrice: data.sellPrice,
        stock: data.stock,
        minStock: data.minStock,
      }),
    });

    // 🔴 DEBUG (IMPORTANT)
    console.log("CREATE STATUS:", res.status);

    return res.json();
  }

  // 🔥 DELETE
  static async delete(id: number) {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    console.log("DELETE STATUS:", res.status);
  }

  static async save(products: any[]) {
    console.warn("save() deprecated");
  }
}