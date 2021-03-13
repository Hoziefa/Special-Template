import { Callback } from '@appTypes/*';

export interface IEventing {
    on(eventType: string, callback: Callback): void;
    trigger(eventType: string): void;
}

export interface IDataPersister {
    persistData<T>(key: string, data: T): void;
    readData<T>(key: string): T;
    clearData(): void;
}
