import { IEventing } from '@appTypes/*';

export class Model {
    constructor(private eventing: IEventing) {}

    on = this.eventing.on.bind(this.eventing);

    trigger = this.eventing.trigger.bind(this.eventing);
}
