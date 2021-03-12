export class DataPersister {
    private constructor() {}

    static persistData<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static readData<T>(key: string): T {
        return JSON.parse(localStorage.getItem(key) ?? 'null');
    }

    static clearData(): void {
        localStorage.clear();
    }
}
