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

  static async todaySummary() {
    try {
      const sales = await SalesService.list();

      const today = new Date().toDateString();

      const todaySales = sales.filter(
        (s: any) =>
          s.dateISO && new Date(s.dateISO).toDateString() === today
      );

      const totalSales = todaySales.reduce(
        (sum: number, s: any) => sum + Number(s.totalAmount || 0),
        0
      );

      const totalProfit = todaySales.reduce(
        (sum: number, s: any) => sum + Number(s.profit || 0),
        0
      );

      return {
        totalSales,
        totalProfit,
        transactions: todaySales.length,
      };
    } catch {
      return { totalSales: 0, totalProfit: 0, transactions: 0 };
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