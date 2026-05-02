const KEY = "sales";

export class SalesService {
  static async list() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  }

  static async record(productIndex: number, quantity: number) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const sales = JSON.parse(localStorage.getItem(KEY) || "[]");

    quantity = Number(quantity);

    const product = products[productIndex];

    if (!product) {
      alert("Product not found");
      return;
    }

    if (!quantity || quantity <= 0) {
      alert("Invalid quantity");
      return;
    }

    if (quantity > product.stock) {
      alert("Not enough stock");
      return;
    }

    const unitPrice = Number(product.sell || 0);

    const newSale = {
      productName: product.name,
      quantity,
      unitPrice,
      totalAmount: unitPrice * quantity,
      dateISO: new Date().toISOString(),
    };

    sales.push(newSale);

    product.stock -= quantity;

    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem(KEY, JSON.stringify(sales));
  }
}