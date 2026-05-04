const API = "http://localhost:3000/credits";

export class CreditService {
  static async list() {
    const res = await fetch(API);
    return res.json();
  }

  static async create(data: {
    customerName: string;
    desc?: string;
    amount: number;
    dueDate: string;
  }) {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  static async delete(id: number) {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
  }
}