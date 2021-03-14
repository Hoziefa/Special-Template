import { View } from '@views/*';
import { EDataPersistKeys, EObservables, HTMLElementEvent } from '@appTypes/*';

interface INavigationBulletsElements {
    navigationBulletsContainer: HTMLDivElement;
}

export class NavigationBullets extends View {
    private readonly bullets = [
        { goTo: '.about--us', content: 'about us' },
        { goTo: '.our-skills', content: 'our skills' },
        { goTo: '.our-gallery', content: 'our gallery' },
        { goTo: '.timeline', content: 'time line' },
        { goTo: '.our-features', content: 'our features' },
        { goTo: '.testimonials', content: 'testimonials' },
        { goTo: '.contact', content: 'contact us' },
    ];

    readonly selectors: Record<keyof INavigationBulletsElements, string> = { navigationBulletsContainer: '.nav-bullets' };

    get elements(): INavigationBulletsElements {
        return { navigationBulletsContainer: document.querySelector<HTMLDivElement>(this.selectors.navigationBulletsContainer)! };
    }

    protected template(): string {
        return `
            <div class="nav-bullets">
                ${ this.bullets.map(({ goTo, content }) => `<div class="bullet" data-goto="${ goTo }"><div class="tooltip">${ content }</div></div>`).join('') }
            </div>
        `;
    }

    protected onRender(): void {
        this.model.on(EObservables.ShowNavigationBullets, () => this.onBulletsOptionChosen(true));
        this.model.on(EObservables.HideNavigationBullets, () => this.onBulletsOptionChosen(false));
    }

    protected eventsMap(): { [p: string]: EventListener & any } {
        const { navigationBulletsContainer } = this.selectors;

        return {
            [`click:${ navigationBulletsContainer }`]: this.navigationController,
        };
    }

    private navigationController = ({ target }: HTMLElementEvent<HTMLDivElement>) => {
        if (!target.matches(`${ this.selectors.navigationBulletsContainer }, ${ this.selectors.navigationBulletsContainer } *`)) return;

        document.querySelector(target.dataset.goto!)?.scrollIntoView({ behavior: 'smooth' });
    };

    //#region Bullets Option Controller
    private onBulletsOptionChosen = (showNavigationBullets: boolean) => this.elements.navigationBulletsContainer.style.display = showNavigationBullets ? 'block' : 'none';

    private persistedBulletsOption = () => {
        const { navigationBulletsContainer } = this.elements;

        if (this.dataPersister.readData<'block' | 'none'>(EDataPersistKeys.BulletsOption)?.includes('block')) navigationBulletsContainer.style.display = 'block';
        else if (this.dataPersister.readData<'block' | 'none'>(EDataPersistKeys.BulletsOption)?.includes('none')) navigationBulletsContainer.style.display = 'none';
    };

    //#endregion Bullets Option Controller

    getPersistedData = () => {
        this.persistedBulletsOption();
    };
}
