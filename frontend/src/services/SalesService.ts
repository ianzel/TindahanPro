const API_URL = "http://localhost:3000/sales";

export class SalesService {
  static async list() {
    const res = await fetch(API_URL);
    return await res.json();
  }

  static async record(productId: number, quantity: number) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    return await res.json();
  }
}