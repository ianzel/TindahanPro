import { ProductService } from "./ProductService.js";
import { SalesService } from "./SalesService.js";

export class ReportService {

  static async lowStockItems() {
    const products = await ProductService.list();
    return products.filter((p: any) => p.stock <= p.minStock);
  }

  static async todaySummary() {
    const sales = await SalesService.list();

    const today = new Date().toDateString();

    const todaySales = sales.filter(
      (s: any) =>
        new Date(s.dateISO).toDateString() === today
    );

    const totalSales = todaySales.reduce(
      (sum: number, s: any) => sum + Number(s.totalAmount),
      0
    );

    const totalProfit = todaySales.reduce(
      (sum: number, s: any) => sum + Number(s.profit),
      0
    );

    return {
      totalSales,
      totalProfit,
      transactions: todaySales.length,
    };
  }

  // ✅ FIXED
  static async salesBetween(start: Date, end: Date) {
    const sales = await SalesService.list();

    const startMs = start.getTime();
    const endMs = end.getTime();

    return sales.filter((s: any) => {
      const ms = new Date(s.dateISO).getTime();
      return ms >= startMs && ms <= endMs;
    });
  }

  static async bestSellingProducts(limit: number = 5) {
    const sales = await SalesService.list();

    const map: Record<number, number> = {};

    sales.forEach((s: any) => {
      map[s.productId] = (map[s.productId] || 0) + s.quantity;
    });

    const products = await ProductService.list();

    return Object.entries(map)
      .map(([id, qty]) => {
        const p = products.find((x: any) => x.id === Number(id));
        return {
          name: p?.name || "Unknown",
          quantity: qty,
        };
      })
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, limit);
  }
}