const API = "http://localhost:3000/credits";

export class CreditService {

  static async list() {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("Failed to load credits");
    }

    return res.json();
  }

  static async create(data: {
    customer: string;
    amount: number;
    dueDate: string;
  }) {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create credit");
    }

    return res.json();
  }
}