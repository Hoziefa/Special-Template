import { View } from '@views/*';
import { HTMLElementEvent } from '@appTypes/*';

interface INavigationBulletsElements {
    navBulletsContainer: HTMLDivElement;
}

export class NavigationBullets extends View {
    readonly bullets = [
        { goTo: '.about--us', content: 'about us' },
        { goTo: '.our-skills', content: 'our skills' },
        { goTo: '.our-gallery', content: 'our gallery' },
        { goTo: '.timeline', content: 'time line' },
        { goTo: '.our-features', content: 'our features' },
        { goTo: '.testimonials', content: 'testimonials' },
        { goTo: '.contact', content: 'contact us' },
    ];

    readonly selectors: Record<keyof INavigationBulletsElements, string> = { navBulletsContainer: '.nav-bullets' };

    // get elements(): INavigationBulletsElements {
    //     return { navBulletsContainer: document.querySelector<HTMLDivElement>(this.selectors.navBulletsContainer)! };
    // }

    protected template(): string {
        return `
            <div class="nav-bullets">
                ${ this.bullets.map(({ goTo, content }) => `<div class="bullet" data-goto="${ goTo }"><div class="tooltip">${ content }</div></div>`).join('') }
            </div>
        `;
    }

    protected eventsMap(): { [p: string]: EventListener & any } {
        const { navBulletsContainer } = this.selectors;

        return {
            [`click:${ navBulletsContainer }`]: this.navigationController,
        };
    }

    private navigationController = ({ target }: HTMLElementEvent<HTMLDivElement>) => {
        if (!target.matches(`${ this.selectors.navBulletsContainer }, ${ this.selectors.navBulletsContainer } *`)) return;

        document.querySelector(target.dataset.goto!)?.scrollIntoView({ behavior: 'smooth' });
    };
}
