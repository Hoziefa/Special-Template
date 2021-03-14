import { EDataPersistKeys, EObservables, HTMLElementEvent } from '@appTypes/*';
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
}

export class Hero extends View<Model, IHeroState> {
    protected readonly state: IHeroState = { currentSlide: 0, timer: NaN, duration: 3000 };

    private readonly images = [
        '/images/slider/slide-1.jpg',
        '/images/slider/slide-2.jpg',
        '/images/slider/slide-3.jpg',
        '/images/slider/slide-4.jpg',
        '/images/slider/slide-5.jpg',
        '/images/slider/slide-6.jpg',
        '/images/slider/slide-7.jpg',
        '/images/slider/slide-8.jpg',
        '/images/slider/slide-9.png',
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
    };

    get elements(): IHeroElements {
        return {
            menuLinksUl: document.querySelector<HTMLUListElement>(this.selectors.menuLinksUl)!,
            toggleMenuBtn: document.querySelector<HTMLButtonElement>(this.selectors.toggleMenuBtn)!,
            slides: document.querySelectorAll<HTMLDivElement>(this.selectors.slides)!,
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
        //>: This What caused the issue with slider not stopping even after clicking `no` random background option cause here we are running the slider when this component mounts,and then in
        // @method=.persistedRandomBgOption(); we are checking if user didn't cash anything in browser we are running another interval without stopping this one
        // and this interval will be lost and can't track it anymore so for this, this interval keep running so we had to just keep in the @method=persist; and it will do the job and must consider
        // that any interval we run must track it and stop it.
        // this.setState({ timer: setInterval(this.autoSlide, this.state.duration) });

        this.model.on(EObservables.EnableRandomBackground, () => this.onRandomBg(true));
        this.model.on(EObservables.DisableRandomBackground, () => this.onRandomBg(false));
    }

    protected eventsMap(): { [key: string]: (e: Event & any) => void } {
        const { linksContainer, toggleMenuBtn } = this.selectors;

        return { [`click:${ toggleMenuBtn }`]: this.toggleMenu, 'click:html': this.closeMenuOnBlur, [`click:${ linksContainer }`]: this.navigationController };
    }

    //#region Toggle Menu
    private toggleMenu = () => {
        this.elements.menuLinksUl.classList.toggle('show');

        this.elements.toggleMenuBtn.classList.toggle('menu-active');
    };

    private closeMenuOnBlur = ({ target }: HTMLElementEvent<HTMLElement>) => {
        if (target.matches(`${ this.selectors.linksContainer }, ${ this.selectors.linksContainer } *`)) return;

        this.elements.menuLinksUl.classList.remove('show');

        this.elements.toggleMenuBtn.classList.remove('menu-active');
    };

    //#endregion Toggle Menu

    //#region Slider Implementation
    private slide = (direction: 'prev' | 'next', slides: Element[] | NodeListOf<Element>) => {
        const { currentSlide, timer, duration } = this.state;

        //> 1-) SPECIFY DIRECTION OF SLIDE TO GO PREVIOUS.
        if (direction === 'prev') this.setState({ currentSlide: currentSlide === 0 ? slides.length - 1 : currentSlide - 1 });

        //> 2-) SPECIFY DIRECTION OF SLIDE TO GO NEXT.
        if (direction === 'next') this.setState({ currentSlide: currentSlide === slides.length - 1 ? 0 : currentSlide + 1 });

        //> 3-) STOP AUTO SLIDE WHEN USER CLICK.
        timer && clearInterval(timer);

        //> 4-) THEN AFTER CLEAR PREVIOUS START AUTO SLIDE AGAIN FOR KEEP WORKING FROM WHERE THE USER STOPPED.
        this.setState({ timer: setInterval(this.autoSlide, duration) });

        //> 5-) REMOVE ACTIVE CLASS FROM SLIDES ITEMS \\ USING .from-METHOD AND SND ARGUMENT OF IT WHICH IS A CALLBACK LOOP-HELPER.
        removeClassAttr(slides);

        //> 6-) ADD CLASS ACTIVE TO CURRENT ITEM.
        slides[currentSlide].classList.add('active');
        // slides[currentSlide].scrollIntoView({ behavior: 'smooth' });

        //> 7-) SAVE CURRENT SLIDE NUMBER IN LOCAL-STORAGE TO KEEP THE ACTIVE SLIDE ON THE CURRENT IMAGE AND KEEP THIS VARIABLE UPDATED WITH EACH setInterval CALL.
        this.dataPersister.persistData(EDataPersistKeys.CurrentSlide, currentSlide);
    };

    private autoSlide = (direction: 'prev' | 'next' = 'next', slides = this.elements.slides): void => this.slide(direction, slides);

    //#endregion Slider Implementation

    //#region Random Background Controller
    private onRandomBg = (isActive: boolean) => {
        const { timer, duration } = this.state;

        isActive ? this.setState({ timer: setInterval(this.autoSlide, duration) }) : clearInterval(timer);
    };

    private persistedRandomBgOption = () => {
        const { timer, duration } = this.state;
        const { slides } = this.elements;

        //>: No need to parse or convert the returned value from @method=readData; cause it's already parsing it with JSON.parse and return the parsed value which is a number.
        this.setState({ currentSlide: this.dataPersister.readData<number>(EDataPersistKeys.CurrentSlide) || 0 });

        const isRandomBackgroundPersisted = this.dataPersister.readData<boolean>(EDataPersistKeys.RandomBackground);

        removeClassAttr(slides);

        slides[this.state.currentSlide].classList.add('active');

        if (isRandomBackgroundPersisted || isRandomBackgroundPersisted === null) this.setState({ timer: setInterval(this.autoSlide, duration) });
        else if (!isRandomBackgroundPersisted) clearInterval(timer);
    };

    //#endregion Random Background Controller

    private navigationController = ({ target }: HTMLElementEvent<HTMLDivElement>) => {
        if (!target.matches(`${ this.selectors.linksContainer } .links li a`)) return;

        document.querySelector(target.dataset.goto!)?.scrollIntoView({ behavior: 'smooth' });
    };

    getPersistedData = () => {
        this.persistedRandomBgOption();
    };
}
