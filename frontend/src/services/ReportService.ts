import { ProductService } from "./ProductService.js";
import { SalesService } from "./SalesService.js";

export class ReportService {

  static async lowStockItems() {
    try {
      const products = await ProductService.list();
      return products.filter((p: any) => p.stock <= p.minStock);
    } catch {
      return [];
    }
  }

  static async getAllSales() {
    try {
      return await SalesService.list();
    } catch {
      return [];
    }
  }
}