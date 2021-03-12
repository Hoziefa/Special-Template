import { HTMLElementEvent } from '@appTypes/*';
import { Model } from '@models/*';
import { View } from '@views/*';

export class Hero extends View<Model> {
    readonly images = [
        '/images/slider/slide-1.jpg',
        '/images/slider/software-development-i1.jpg',
        '/images/special/Services_Web.jpg',
        '/images/slider/SoftwareDevelopmentInfocirclesTechnoogySolutions.jpg',
        '/images/slider/Custom-Software-Development.jpg',
        '/images/slider/Geometry-Header-1920x1080.jpg',
        '/images/home/home-bg1.jpg',
        '/images/home/home-bg2.jpg',
        '/images/home/home-bg3.png',
    ];

    readonly links = [
        { goTo: '', content: 'home' },
        { goTo: '.about--us', content: 'about' },
        { goTo: '.our-skills', content: 'skills' },
        { goTo: '.our-gallery', content: 'gallery' },
        { goTo: '.timeline', content: 'timeline' },
        { goTo: '.our-features', content: 'features' },
        { goTo: '.testimonials', content: 'testimonials' },
        { goTo: '.contact', content: 'contact' },
    ];

    readonly selectors = { menuLinksUl: '.links-container .links', toggleMenuBtn: '.links-container .toggle-menu' };

    get elements() {
        return {
            menuLinksUl: document.querySelector(this.selectors.menuLinksUl)!,
            toggleMenuBtn: document.querySelector(this.selectors.toggleMenuBtn)!,
        };
    }

    protected eventsMap(): { [key: string]: (e: Event & any) => void } {
        const { toggleMenuBtn } = this.selectors;

        return {
            [`click:${toggleMenuBtn}`]: this.toggleMenu,
            [`click:body`]: this.closeMenuOnBlur,
        };
    }

    protected template(): string {
        return `
        <section class="hero">
            <div class="container">
                <header class="header-area">
                    <nav>
                        <div class="logo">
                            <h2>special design</h2>
                        </div>

                        <div class="links-container">
                            <ul class="links">
                                ${this.links
                                    .map(
                                        ({ goTo, content }, idx) => `
                                            <li class="list-item">
                                                <a href="#" class="${idx === 0 ? 'active' : ''}" data-goto="${goTo}">
                                                    ${content}
                                                </a>
                                            </li>
                                        `,
                                    )
                                    .join('')}
                            </ul>

                            <button class="toggle-menu">
                                ${Array.from({ length: 3 })
                                    .map(() => `<span></span>`)
                                    .join('')}
                            </button>
                        </div>
                    </nav>
                </header>
            </div>

            <div class="slides-container">
                ${this.images
                    .map(
                        (url, idx) => `
                        <div class="slide-image ${idx === 0 ? 'active' : ''}"
                        style="background: linear-gradient(#000000a6, #000000a6), url('${url}') center no-repeat fixed">
                        </div>`,
                    )
                    .join('')}
            </div>

            <div class="introduction-text">
                <h1>we are <span>creative</span> agency</h1>
                <p>
                    A dream, all a dream, that ends in nothing, and leaves the sleeper where he lay down, but I wish you
                    to know that you inspired it.
                </p>
            </div>
        </section>
        `;
    }

    private toggleMenu = () => {
        this.elements.menuLinksUl.classList.toggle('show');

        this.elements.toggleMenuBtn.classList.toggle('menu-active');
    };

    private closeMenuOnBlur = ({ target }: HTMLElementEvent<HTMLElement>) => {
        if (target.matches(`.links-container, .links-container *`)) return;

        this.elements.menuLinksUl.classList.remove('show');

        this.elements.toggleMenuBtn.classList.remove('menu-active');
    };
}
