export interface Credit {
  id: string;
  customerName: string;
  amount: number;
  dateISO: string;
  status: "paid" | "unpaid";
}