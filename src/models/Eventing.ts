import { Callback, IEventing } from '@appTypes/*';

export class Eventing implements IEventing {
    private readonly events: { [key: string]: Callback[] } = {};

    public on<T>(eventType: string, callback: Callback<T>): void {
        Object.assign(this.events, { [eventType]: [...(this.events[eventType] ?? []), callback] });
    }

    public trigger<T>(eventType: string, ...args: T[]): void {
        this.events[eventType]?.forEach((callback): void => callback(...args));
    }
}
