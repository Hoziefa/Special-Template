import { Model } from '@models/Model';
import { IDataPersister, PartialRequired } from '@appTypes/*';

interface IState {
    [key: string]: any;
}

export abstract class View<T extends Model = any, S extends Readonly<IState> = {}> {
    protected abstract template(): string;

    protected regions: { [key: string]: Element } = {};
    protected state: S = {} as S;

    constructor(private parent: Element, public model: T, public dataPersister: IDataPersister) {
        this.model.on('change', this.render);
    }

    protected setState(newState: PartialRequired<S>): void {
        Object.assign(this.state, newState);
    }

    protected eventsMap(): { [key: string]: EventListener } {
        return {};
    }

    protected regionsMap(): { [key: string]: string } {
        return {};
    }

    private bindEvents(fragment: DocumentFragment | Element): void {
        Object.entries(this.eventsMap()).forEach(([eventType, callback]) => {
            const [eventName, selector] = eventType.split(':');

            fragment.querySelectorAll(selector).forEach(elm => elm.addEventListener(eventName, callback));
        });
    }

    private bindRegions(fragment: DocumentFragment | Element): void {
        Object.entries(this.regionsMap()).forEach(([regionKey, regionValue]) => {
            this.regions[regionKey] = fragment.querySelector(regionValue)!;
        });
    }

    protected onRender(): void {}

    render(): void {
        this.parent.textContent = '';

        this.parent.insertAdjacentHTML('afterbegin', this.template());

        this.bindEvents(this.parent);

        this.bindRegions(this.parent);

        this.onRender();
    }
}
