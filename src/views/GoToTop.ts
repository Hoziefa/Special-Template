import { View } from '@views/*';

interface IGoToTopElements {
    gotoTop: HTMLButtonElement
}

export class GoToTop extends View {
    readonly selectors: Record<keyof IGoToTopElements, string> = { gotoTop: '.goto-top' };

    get elements(): IGoToTopElements {
        return { gotoTop: document.querySelector<HTMLButtonElement>(this.selectors.gotoTop)! };
    };

    protected template(): string {
        return `<div class="goto-top"><i class="fas fa-angle-double-up"></i><span>go top</span</div>`;
    }

    protected eventsMap(): { [p: string]: EventListener } {
        const { gotoTop } = this.selectors;

        return { [`click:${ gotoTop }`]: () => document.documentElement.scrollIntoView({ behavior: 'smooth' }), 'scroll:html': this.toggleGoTopBtnDisplay };
    }

    private toggleGoTopBtnDisplay = (): void => pageYOffset > innerHeight - 100 ? this.elements.gotoTop.classList.add('render') : this.elements.gotoTop.classList.remove('render');
}
