export class DataPersister {
    private constructor() {}

    static persistData<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static readData<T>(key: string): T | null {
        return JSON.parse(localStorage.getItem(key) ?? 'null');
    }

    static clearData(): void {
        localStorage.clear();
    }
}
