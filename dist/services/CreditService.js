import { StorageService } from "./StorageService.js";
const KEY = "tp_credit";
export class CreditService {
    static list() {
        return StorageService.get(KEY, []);
    }
    static saveAll(credits) {
        StorageService.set(KEY, credits);
    }
    static add(c) {
        const credits = this.list();
        credits.push(c);
        this.saveAll(credits);
    }
    static markPaid(id) {
        const credits = this.list().map((c) => {
            if (c.id !== id)
                return c;
            return { ...c, status: "paid" }; // "paid" is literal union value
        });
        this.saveAll(credits);
    }
}
