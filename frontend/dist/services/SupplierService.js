const API = "http://localhost:3000/suppliers";
export class SupplierService {
    static async list() {
        const res = await fetch(API);
        return res.json();
    }
    static async create(data) {
        return fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    }
    static async delete(id) {
        return fetch(`${API}/${id}`, {
            method: "DELETE",
        });
    }
}
