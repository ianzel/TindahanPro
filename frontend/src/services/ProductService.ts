export class ProductService {

  static async list() {
    return JSON.parse(localStorage.getItem("products") || "[]");
  }

  static async add(product: any) {
    const products = await this.list();

    product.id = Date.now();

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products));
  }

}