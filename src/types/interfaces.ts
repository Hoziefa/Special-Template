import { Callback, DataPersistKeys } from '@appTypes/*';

export interface IEventing {
    on<T>(eventType: string, callback: Callback<T>): void;
    trigger<T>(eventType: string, ...args: Array<T>): void;
}

export interface IDataPersister {
    persistData<T>(key: DataPersistKeys, data: T): void;
    deleteData(key: DataPersistKeys): void;
    readData<T>(key: DataPersistKeys): T | null;
    clearData(): void;
}
