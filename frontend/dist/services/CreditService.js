const API = "http://localhost:3000/credits";
export class CreditService {
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
    static async toggle(id) {
        return fetch(`${API}/${id}/toggle`, {
            method: "PATCH",
        });
    }
}
