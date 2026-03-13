export interface Sale {
  id: string;
  productId: number;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  totalAmount: number;
  profit: number;
  dateISO: string;
}