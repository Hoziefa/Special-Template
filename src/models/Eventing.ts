import { Callback } from '@appTypes/typeAliases';

export class Eventing {
    private events: { [key: string]: Callback[] } = {};

    on(eventType: string, callback: Callback): void {
        Object.assign(this.events, { [eventType]: [...(this.events[eventType] ?? []), callback] });
    }

    trigger(eventType: string): void {
        this.events[eventType]?.forEach(callback => callback());
    }
}
