import { Product } from "../models/Product.js";
import { StorageService } from "./StorageService.js";

const KEY = "tp_products";

export class ProductService {
  static list(): Product[] {
    return StorageService.get<Product[]>(KEY, []);
  }

  static saveAll(products: Product[]): void {
    StorageService.set(KEY, products);
  }

  static add(product: Product): void {
    const products = this.list();
    products.push(product);
    this.saveAll(products);
  }

  static update(updated: Product): void {
    const products = this.list().map((product) =>
      product.id === updated.id ? updated : product
    );
    this.saveAll(products);
  }

  static remove(id: number): void {
    const products = this.list().filter((product) => product.id !== id);
    this.saveAll(products);
  }

  static getById(id: number): Product | undefined {
    return this.list().find((product) => product.id === id);
  }
}