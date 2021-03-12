import { Callback } from '@appTypes/*';

export interface IEventing {
    on(eventType: string, callback: Callback): void;
    trigger(eventType: string): void;
}

// export interface IAttributes<T> {
//     get<K extends keyof T>(key: K): T[K];
//     set(data: PartialRequired<T>): void;
//     getAttrs(): T;
// }
//
// export interface IASyncActions<T> {
//     fetch(id?: number): Promise<T[] | T>;
//     save(data: T, id?: number): Promise<T>;
//     delete(id: number): Promise<void>;
// }

export interface IDataPersister {
    persistData<T>(key: string, data: T): void;
    readData<T>(key: string): T;
    clearData(): void;
}
