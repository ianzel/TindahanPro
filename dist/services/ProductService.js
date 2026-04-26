const API = "http://127.0.0.1:3000/products";
export class ProductService {
    static async list() {
        try {
            const res = await fetch(API);
            if (!res.ok) {
                throw new Error("Server error");
            }
            return await res.json();
        }
        catch (err) {
            console.error("PRODUCT FETCH ERROR:", err);
            return []; // ✅ prevent crash
        }
    }
    static async create(data) {
        try {
            const res = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Failed to save");
            }
            return await res.json();
        }
        catch (err) {
            console.error("CREATE ERROR:", err);
            throw err;
        }
    }
}
