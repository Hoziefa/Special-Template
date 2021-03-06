import { View } from '@views/*';
import { Model } from '@models/*';
import { DataPersistKeys, ObservablesDescriptors, PersistedNavigationBulletsOptions, HTMLElementEvent } from '@appTypes/*';

interface INavigationBulletsState {
    showNavigationBullets: PersistedNavigationBulletsOptions;
}

interface INavigationBulletsElements {
    navigationBulletsContainer: HTMLDivElement;
}

export class NavigationBullets extends View<Model, INavigationBulletsState> {
    protected readonly state: INavigationBulletsState = {
        showNavigationBullets: this.dataPersister.readData<PersistedNavigationBulletsOptions>(DataPersistKeys.BulletsOption) ?? PersistedNavigationBulletsOptions.ShowNavigationBullets,
    };

    private readonly bullets = [
        { goTo: '.about--us', content: 'about us' },
        { goTo: '.our-skills', content: 'our skills' },
        { goTo: '.our-gallery', content: 'our gallery' },
        { goTo: '.timeline', content: 'time line' },
        { goTo: '.our-features', content: 'our features' },
        { goTo: '.testimonials', content: 'testimonials' },
        { goTo: '.contact', content: 'contact us' },
    ];

    public readonly selectors: Record<keyof INavigationBulletsElements, string> = { navigationBulletsContainer: '.nav-bullets' };

    public get elements(): INavigationBulletsElements {
        return { navigationBulletsContainer: document.querySelector<HTMLDivElement>(this.selectors.navigationBulletsContainer)! };
    }

    protected template(): string {
        return `
            <div class="nav-bullets">
                ${ this.bullets.map(({ goTo, content }): string => `<div class="bullet" data-goto="${ goTo }"><div class="tooltip">${ content }</div></div>`).join('') }
            </div>
        `;
    }

    protected onRender(): void {
        this.model.on<PersistedNavigationBulletsOptions>(ObservablesDescriptors.ShowHideNavigationBullets, this.onBulletsOptionChosen);
    }

    protected eventsMap(): { [p: string]: EventListener & any } {
        const { navigationBulletsContainer } = this.selectors;

        return { [`click:${ navigationBulletsContainer }`]: this.navigationController };
    }

    private navigationController = ({ target }: HTMLElementEvent<HTMLDivElement>): void => {
        if (!target.matches(`${ this.selectors.navigationBulletsContainer }, ${ this.selectors.navigationBulletsContainer } *`)) return;

        document.querySelector(target.dataset.goto!)?.scrollIntoView({ behavior: 'smooth' });
    };

    //#region Bullets Option Controller
    private onBulletsOptionChosen = (showNavigationBullets: PersistedNavigationBulletsOptions): void => {
        this.elements.navigationBulletsContainer.style.display = showNavigationBullets;

        this.setState({ showNavigationBullets });
    };

    private persistedBulletsOption = (): void => (this.elements.navigationBulletsContainer.style.display = this.state.showNavigationBullets) && undefined;

    //#endregion Bullets Option Controller

    public getPersistedData = (): void => {
        this.persistedBulletsOption();
    };
}
