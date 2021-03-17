import { Model } from '@models/*';
import { IDataPersister, PartialRequired } from '@appTypes/*';

interface IState {
    [key: string]: any;
}

export abstract class View<T extends Model = Model, S extends Readonly<IState> = {}> {
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

            if (selector === 'html') return document.addEventListener(eventName, callback);

            fragment.querySelectorAll(selector).forEach(elm => elm.addEventListener(eventName, callback));
        });
    }

    private bindRegions(fragment: DocumentFragment | Element): void {
        Object.entries(this.regionsMap()).forEach(([regionKey, regionValue]) => {
            this.regions[regionKey] = fragment.querySelector(regionValue)!;
        });
    }

    protected onRender(): void {}

    // protected readDomElements(): void {}

    render(): void {
        // this.parent.textContent = '';

        // this.parent.insertAdjacentHTML('afterbegin', this.template());

        // this.bindEvents(this.parent);

        // this.bindRegions(this.parent);

        // this.onRender();

        // this.parent.textContent = '';

        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.bindRegions(templateElement.content);

        this.onRender();

        this.parent.append(templateElement.content);

        // this.readDomElements();
    }
}
