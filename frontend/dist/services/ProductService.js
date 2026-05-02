const KEY = "products";
export class ProductService {
    static async list() {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    }
    static async create(data) {
        const products = await this.list();
        const newProduct = {
            name: data.name,
            stock: Number(data.stock),
            sell: Number(data.sell),
            buy: Number(data.buy),
        };
        products.push(newProduct);
        localStorage.setItem(KEY, JSON.stringify(products));
        return newProduct;
    }
    static async save(products) {
        localStorage.setItem(KEY, JSON.stringify(products));
    }
}
