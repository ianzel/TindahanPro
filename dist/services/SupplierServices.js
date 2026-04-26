import { StorageService } from "./StorageService";
const KEY = "tp_suppliers";
export class SupplierService {
    static list() {
        return StorageService.get(KEY, []);
    }
    static saveAll(suppliers) {
        StorageService.set(KEY, suppliers);
    }
    static add(s) {
        const suppliers = this.list();
        suppliers.push(s);
        this.saveAll(suppliers);
    }
    static remove(id) {
        const suppliers = this.list().filter(s => s.id !== id);
        this.saveAll(suppliers);
    }
}
