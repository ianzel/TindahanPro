import { Sale } from "../models/Sale.js";
import { StorageService } from "./StorageService.js";
import { ProductService } from "./ProductService.js";

const KEY = "tp_sales";

export class SalesService {
  static list(): Sale[] {
    return StorageService.get<Sale[]>(KEY, []);
  }

  static saveAll(sales: Sale[]): void {
    StorageService.set(KEY, sales);
  }

  static record(productId: number, quantity: number): Sale {
    const product = ProductService.getById(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new Error("Quantity must be greater than 0.");
    }

    if (product.stock < quantity) {
      throw new Error(`Not enough stock. Available: ${product.stock}`);
    }

    const unitPrice = Number(product.sellingPrice);
    const unitCost = Number(product.buyingPrice);

    const totalAmount = unitPrice * quantity;
    const profit = (unitPrice - unitCost) * quantity;

    ProductService.update({
      ...product,
      stock: product.stock - quantity,
    });

    const sale: Sale = {
      id: crypto.randomUUID(),
      productId,
      quantity,
      unitPrice,
      unitCost,
      totalAmount,
      profit,
      dateISO: new Date().toISOString(),
    };

    const sales = this.list();
    sales.push(sale);
    this.saveAll(sales);

    return sale;
  }
}