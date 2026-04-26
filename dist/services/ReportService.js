import { ProductService } from "./ProductService.js";
import { SalesService } from "./SalesService.js";
export class ReportService {
    static async lowStockItems() {
        const products = await ProductService.list();
        return products.filter((p) => p.stock <= p.minStock);
    }
    static async todaySummary() {
        const sales = await SalesService.list();
        const today = new Date().toDateString();
        const todaySales = sales.filter((s) => new Date(s.dateISO).toDateString() === today);
        const totalSales = todaySales.reduce((sum, s) => sum + Number(s.totalAmount), 0);
        const totalProfit = todaySales.reduce((sum, s) => sum + Number(s.profit), 0);
        return {
            totalSales,
            totalProfit,
            transactions: todaySales.length,
        };
    }
    static async salesBetween(start, end) {
        const sales = await SalesService.list();
        const startMs = start.getTime();
        const endMs = end.getTime();
        return sales.filter((s) => {
            const ms = new Date(s.dateISO).getTime();
            return ms >= startMs && ms <= endMs;
        });
    }
    static async bestSellingProducts(limit = 5) {
        const sales = await SalesService.list();
        const map = {};
        sales.forEach((s) => {
            map[s.productId] = (map[s.productId] || 0) + s.quantity;
        });
        const products = await ProductService.list();
        return Object.entries(map)
            .map(([id, qty]) => {
            const p = products.find((x) => x.id === Number(id));
            return {
                name: p?.name || "Unknown",
                quantity: qty,
            };
        })
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, limit);
    }
    /* ✅ ADD THIS */
    static async getAllSales() {
        return await SalesService.list();
    }
}
