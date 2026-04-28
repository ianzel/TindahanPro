const API = "http://127.0.0.1:3000/products";
export class ProductService {
    static async list() {
        try {
            const res = await fetch(API);
            if (!res.ok)
                throw new Error("Server error");
            return await res.json();
        }
        catch (err) {
            console.error("PRODUCT LOAD ERROR:", err);
            return []; // prevents blank screen
        }
    }
    static async create(data) {
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok)
            throw new Error("Create failed");
        return res.json();
    }
}
