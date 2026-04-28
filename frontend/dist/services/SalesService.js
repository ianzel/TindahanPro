const API = "http://127.0.0.1:3000/sales";
export class SalesService {
    static async list() {
        const res = await fetch(API);
        return res.json();
    }
    static async record(productId, quantity) {
        const res = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, quantity }),
        });
        if (!res.ok) {
            throw new Error("Failed to record sale");
        }
        return res.json();
    }
}
