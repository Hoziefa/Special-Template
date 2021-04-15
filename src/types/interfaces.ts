import { Callback } from '@appTypes/*';

export interface IEventing {
    on<T>(eventType: string, callback: Callback<T>): void;
    trigger<T>(eventType: string, ...args: Array<T>): void;
}

export interface IDataPersister {
    persistData<T>(key: string, data: T): void;
    deleteData(key: string): void;
    readData<T>(key: string): T | null;
    clearData(): void;
}
