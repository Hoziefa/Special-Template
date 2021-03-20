import { Callback, IEventing } from '@appTypes/*';

export class Eventing implements IEventing {
    private events: { [key: string]: Callback[] } = {};

    on<T>(eventType: string, callback: Callback<T>): void {
        Object.assign(this.events, { [eventType]: [...(this.events[eventType] ?? []), callback] });
    }

    trigger<T>(eventType: string, ...args: T[]): void {
        this.events[eventType]?.forEach(callback => callback(...args));
    }
}
