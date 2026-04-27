import { Credit } from "../models/Credit.js";
import { StorageService } from "./StorageService.js";

const KEY = "tp_credit";

export class CreditService {
  static list(): Credit[] {
    return StorageService.get<Credit[]>(KEY, []);
  }

  static saveAll(credits: Credit[]): void {
    StorageService.set(KEY, credits);
  }

  static add(c: Credit): void {
    const credits = this.list();
    credits.push(c);
    this.saveAll(credits);
  }

  static markPaid(id: string): void {
    const credits: Credit[] = this.list().map((c): Credit => {
      if (c.id !== id) return c;
      return { ...c, status: "paid" }; // "paid" is literal union value
    });

    this.saveAll(credits);
  }
}