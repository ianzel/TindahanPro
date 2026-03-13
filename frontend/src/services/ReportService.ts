import { ProductService } from "./ProductService.js";
import { SalesService } from "./SalesService.js";

export class ReportService {
  static inventoryValue(): number {
    return ProductService.list().reduce(
      (sum, product) => sum + Number(product.buyingPrice) * product.stock,
      0
    );
  }

  static lowStockItems() {
    return ProductService.list().filter(
      (product) => product.stock <= product.minStock
    );
  }

  static todaySummary() {
    const todayKey = new Date().toDateString();

    const salesToday = SalesService.list().filter(
      (sale) => new Date(sale.dateISO).toDateString() === todayKey
    );

    const totalSales = salesToday.reduce(
      (sum, sale) => sum + Number(sale.totalAmount),
      0
    );

    const totalProfit = salesToday.reduce(
      (sum, sale) => sum + Number(sale.profit),
      0
    );

    return {
      totalSales,
      totalProfit,
      transactions: salesToday.length,
      lowStockCount: this.lowStockItems().length,
      inventoryValue: this.inventoryValue(),
    };
  }

  static salesBetween(start: Date, end: Date) {
    const startMs = start.getTime();
    const endMs = end.getTime();

    return SalesService.list().filter((sale) => {
      const ms = new Date(sale.dateISO).getTime();
      return ms >= startMs && ms <= endMs;
    });
  }
}