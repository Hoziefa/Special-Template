import { IEventing } from '@appTypes/*';

export class Model {
    public readonly on = this.eventing.on.bind(this.eventing);

    public readonly trigger = this.eventing.trigger.bind(this.eventing);

    constructor(private readonly eventing: IEventing) {}
}
