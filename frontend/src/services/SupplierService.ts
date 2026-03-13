import { Supplier } from "../models/Supplier.js";
import { StorageService } from "./StorageService.js";

const KEY = "tp_suppliers";

export class SupplierService {

  static list(): Supplier[] {
    return StorageService.get<Supplier[]>(KEY, []);
  }

  static saveAll(suppliers: Supplier[]): void {
    StorageService.set(KEY, suppliers);
  }

  static add(s: Supplier): void {
    const suppliers = this.list();
    suppliers.push(s);
    this.saveAll(suppliers);
  }

  static remove(id: string): void {
    const suppliers = this.list().filter(s => s.id !== id);
    this.saveAll(suppliers);
  }

}