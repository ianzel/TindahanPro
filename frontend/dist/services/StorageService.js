export class StorageService {
    static get(key, fallback) {
        const raw = localStorage.getItem(key);
        if (!raw) {
            return fallback;
        }
        try {
            return JSON.parse(raw);
        }
        catch {
            return fallback;
        }
    }
    static set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
