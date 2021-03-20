import { EDataPersistKeys, EObservablesDescriptors, HTMLElementEvent } from '@appTypes/*';
import { Model } from '@models/*';
import { removeClassAttr } from '@utils/*';
import { View } from '@views/*';

interface IHeroState {
    currentSlide: number;
    timer: number;
    duration: number;
}

interface IHeroElements {
    linksContainer?: HTMLDivElement;
    menuLinksUl: HTMLUListElement;
    toggleMenuBtn: HTMLButtonElement;
    slides: NodeListOf<HTMLDivElement>;
    paginationContainer: HTMLDivElement;
}

export class Hero extends View<Model, IHeroState> {
    protected readonly state: IHeroState = { currentSlide: 0, timer: NaN, duration: 3000 };

    private readonly images = [
        'assets/images/slider/slide-1.jpg',
        'assets/images/slider/slide-2.jpg',
        'assets/images/slider/slide-3.jpg',
        'assets/images/slider/slide-4.jpg',
        'assets/images/slider/slide-5.jpg',
        'assets/images/slider/slide-6.jpg',
        'assets/images/slider/slide-7.jpg',
        'assets/images/slider/slide-8.jpg',
        'assets/images/slider/slide-9.png',
    ];

    private readonly links = [
        { goTo: '', content: 'home' },
        { goTo: '.about--us', content: 'about' },
        { goTo: '.our-skills', content: 'skills' },
        { goTo: '.our-gallery', content: 'gallery' },
        { goTo: '.timeline', content: 'timeline' },
        { goTo: '.our-features', content: 'features' },
        { goTo: '.testimonials', content: 'testimonials' },
        { goTo: '.contact', content: 'contact' },
    ];

    readonly selectors: Record<keyof IHeroElements, string> = {
        linksContainer: '.links-container',
        menuLinksUl: '.links-container .links',
        toggleMenuBtn: '.links-container .toggle-menu',
        slides: '.slides-container .slide-image',
        paginationContainer: '.pagination-container',
    };

    get elements(): IHeroElements {
        const { menuLinksUl, toggleMenuBtn, slides, paginationContainer } = this.selectors;

        return {
            menuLinksUl: document.querySelector<HTMLUListElement>(menuLinksUl)!,
            toggleMenuBtn: document.querySelector<HTMLButtonElement>(toggleMenuBtn)!,
            slides: document.querySelectorAll<HTMLDivElement>(slides)!,
            paginationContainer: document.querySelector<HTMLDivElement>(paginationContainer)!,
        };
    }

    protected template(): string {
        return `
        <section class="hero">
            <div class="container">
                <header class="header-area">
                    <nav>
                        <div class="logo">
                            <h2>dmc</h2>
                        </div>

                        <div class="links-container">
                            <ul class="links">
                                ${ this.links.map(({ goTo, content }, idx) => `
                                    <li class="list-item">
                                        <a href="#${ goTo.replace('.', '') }" class="${ idx === 0 ? 'active' : '' }" data-goto="${ goTo }">${ content }</a>
                                    </li>`).join('') }
                            </ul>

                            <button class="toggle-menu" aria-label="toggle menu">
                                ${ Array.from({ length: 3 }).map(() => `<span></span>`).join('') }
                            </button>
                        </div>
                    </nav>
                </header>
            </div>
        
            <div class="slides-container">
                ${ this.images.map((url, idx) => `<div class="slide-image ${ idx === 0 ? 'active' : '' }" style="background: linear-gradient(#000000a6, #000000a6), url('${ url }') center no-repeat fixed"></div>`).join('') }
            </div>
        
            <div class="pagination-container">${ this.images.map((_, idx) => `<button aria-label="pagination-${ idx + 1 }" data-pagination="${ idx }"></button>`).join('') }</div>
                
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

    protected onRender(): void {
        this.model.on<boolean>(EObservablesDescriptors.EnableDisableRandomBackground, this.onRandomBackgroundOptionChange);
    }

    protected eventsMap(): { [key: string]: (e: Event & any) => void } {
        const { linksContainer, toggleMenuBtn, paginationContainer } = this.selectors;

        return {
            [`click:${ toggleMenuBtn }`]: this.toggleMenu,
            'click:html': this.closeMenuOnBlur,
            [`click:${ linksContainer }`]: this.navigationController,
            [`click:${ paginationContainer }`]: this.onPaginationChange,
        };
    }

    //#region Toggle Menu
    private toggleMenu = (): void => {
        this.elements.menuLinksUl.classList.toggle('show');

        this.elements.toggleMenuBtn.classList.toggle('menu-active');
    };

    private closeMenuOnBlur = ({ target }: HTMLElementEvent<HTMLElement>): void => {
        if (target.matches(`${ this.selectors.linksContainer }, ${ this.selectors.linksContainer } *`)) return;

        this.elements.menuLinksUl.classList.remove('show');

        this.elements.toggleMenuBtn.classList.remove('menu-active');
    };

    //#endregion Toggle Menu

    //#region Slider Implementation
    private slide = (direction: 'prev' | 'next', slides: Element[] | NodeListOf<Element>): void => {
        const { currentSlide, timer, duration } = this.state;
        const { paginationContainer } = this.elements;
        const isRandomBackgroundPersisted = this.dataPersister.readData<boolean>(EDataPersistKeys.RandomBackground);

        if (direction === 'prev') this.setState({ currentSlide: currentSlide === 0 ? slides.length - 1 : currentSlide - 1 });

        if (direction === 'next') this.setState({ currentSlide: currentSlide === slides.length - 1 ? 0 : currentSlide + 1 });

        timer && clearInterval(timer);

        (isRandomBackgroundPersisted === null || isRandomBackgroundPersisted) && this.setState({ timer: setInterval(this.autoSlide, duration) });

        removeClassAttr(slides);
        removeClassAttr(paginationContainer.children);

        slides[currentSlide].classList.add('active');
        paginationContainer.children[currentSlide].classList.add('active');

        this.dataPersister.persistData(EDataPersistKeys.CurrentSlide, currentSlide);
    };

    private autoSlide = (direction: 'prev' | 'next' = 'next', slides = this.elements.slides): void => this.slide(direction, slides);

    //#endregion Slider Implementation

    //#region Random Background Controller
    private onRandomBackgroundOptionChange = (enableRandomBackground: boolean): void => {
        const { timer, duration } = this.state;

        enableRandomBackground ? this.setState({ timer: setInterval(this.autoSlide, duration) }) : clearInterval(timer);
    };

    private persistedRandomBgOption = (): void => {
        const { timer, duration } = this.state;
        const { slides, paginationContainer } = this.elements;
        const currentSlide = this.dataPersister.readData<number>(EDataPersistKeys.CurrentSlide) ?? 0;
        const isRandomBackgroundPersisted = this.dataPersister.readData<boolean>(EDataPersistKeys.RandomBackground);

        this.setState({ currentSlide });

        removeClassAttr(slides);
        removeClassAttr(paginationContainer.children);

        slides[currentSlide].classList.add('active');
        paginationContainer.children[currentSlide].classList.add('active');

        if (isRandomBackgroundPersisted === null || isRandomBackgroundPersisted) this.setState({ timer: setInterval(this.autoSlide, duration) });
        else if (!isRandomBackgroundPersisted) clearInterval(timer);
    };

    //#endregion Random Background Controller

    private navigationController = ({ target }: HTMLElementEvent<HTMLDivElement>): void => {
        if (!target.matches(`${ this.selectors.linksContainer } .links li a`)) return;

        document.querySelector(target.dataset.goto!)?.scrollIntoView({ behavior: 'smooth' });
    };

    private onPaginationChange = ({ target }: HTMLElementEvent<HTMLButtonElement>): void => {
        if (!target.matches('button, button *')) return;

        this.setState({ currentSlide: +target.dataset.pagination! });

        this.autoSlide();
    };

    getPersistedData = (): void => {
        this.persistedRandomBgOption();
    };
}
