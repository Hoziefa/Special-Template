import { Model } from '@models/*';
import { IDataPersister, PartialRequired } from '@appTypes/*';

interface IState {
    [key: string]: any;
}

export abstract class View<T extends Model = Model, S extends Readonly<IState> = {}> {
    protected regions: { [key: string]: Element } = {};

    protected state = {} as S;

    constructor(private parent: Element, public model: T, public dataPersister: IDataPersister) {
        this.model.on('change', this.render);
    }

    protected abstract template(): string;

    protected setState(newState: PartialRequired<S>): void {
        Object.assign(this.state, newState);
    }

    protected eventsMap(): { [key: string]: EventListener } {
        return {};
    }

    protected regionsMap(): { [key: string]: string } {
        return {};
    }

    protected onRender(): void {}

    private bindEvents(fragment: DocumentFragment | Element): void {
        Object.entries(this.eventsMap()).forEach(([eventType, callback]): void => {
            const [eventName, selector] = eventType.split(':');

            if (selector === 'html') return document.addEventListener(eventName, callback);

            fragment.querySelectorAll(selector).forEach((domElement): void => domElement.addEventListener(eventName, callback));
        });
    }

    private bindRegions(fragment: DocumentFragment | Element): void {
        Object.entries(this.regionsMap()).forEach(([regionKey, regionValue]): void => {
            this.regions[regionKey] = fragment.querySelector(regionValue)!;
        });
    }

    public render(): void {
        const templateElement = document.createElement('template');

        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.bindRegions(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);
    }
}
