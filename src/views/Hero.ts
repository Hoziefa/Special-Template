import { HTMLElementEvent, EDataPersistKeys, EObservables } from '@appTypes/*';
import { Model } from '@models/*';
import { removeClassAttr } from '@utils/*';
import { View } from '@views/*';

interface ISettingsBoxState {
    currentSlide: number;
    timer: number;
    duration: number;
}

export class Hero extends View<Model, ISettingsBoxState> {
    protected readonly state: ISettingsBoxState = { currentSlide: 0, timer: NaN, duration: 3000 };

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

    readonly selectors = {
        linksContainer: '.links-container',
        menuLinksUl: '.links-container .links',
        toggleMenuBtn: '.links-container .toggle-menu',
        slides: '.slides-container .slide-image',
    };

    get elements() {
        return {
            menuLinksUl: document.querySelector<HTMLLinkElement>(this.selectors.menuLinksUl)!,
            toggleMenuBtn: document.querySelector<HTMLButtonElement>(this.selectors.toggleMenuBtn)!,
            slides: document.querySelectorAll<HTMLDivElement>(this.selectors.slides)!,
        };
    }

    protected onRender(): void {
        this.setState({ timer: setInterval(this.autoSlide, this.state.duration) });

        this.model.on(EObservables.EnableRandomBackground, () => this.onRandomBg(true));
        this.model.on(EObservables.DisableRandomBackground, () => this.onRandomBg(false));
    }

    protected eventsMap(): { [key: string]: (e: Event & any) => void } {
        const { toggleMenuBtn } = this.selectors;

        return {
            [`click:${toggleMenuBtn}`]: this.toggleMenu,
            'click:html': this.closeMenuOnBlur, // blur:.links-container
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

                            <button class="toggle-menu" aria-label="toggle menu">
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

    //#region Toggle Menu
    private toggleMenu = () => {
        this.elements.menuLinksUl.classList.toggle('show');

        this.elements.toggleMenuBtn.classList.toggle('menu-active');
    };

    //ToDo: Not working yet cause we are selecting the dom elms from the fragment that we pass and the HTML is the absolute parent and the parent of the fragment so to make it work we could make a condition on @method=.bindEvents; to check based the selector that we receive | or we have to figure another way to do this.
    private closeMenuOnBlur = ({ target }: HTMLElementEvent<HTMLElement>) => {
        if (target.matches(`${this.selectors.linksContainer}, ${this.selectors.linksContainer} *`)) return;

        this.elements.menuLinksUl.classList.remove('show');

        this.elements.toggleMenuBtn.classList.remove('menu-active');
    };
    //#endregion Toggle Menu

    //#region Slider Implementation
    private slide = (direction: 'prev' | 'next', slides: Element[] | NodeListOf<Element>) => {
        const { currentSlide, timer, duration } = this.state;

        //ToDo 1-) SPECIFY DIRECTION OF SLIDE TO GO PREVIOUS.
        if (direction === 'prev')
            this.setState({ currentSlide: currentSlide === 0 ? slides.length - 1 : currentSlide - 1 });

        //ToDo 2-) SPECIFY DIRECTION OF SLIDE TO GO NEXT.
        if (direction === 'next')
            this.setState({ currentSlide: currentSlide === slides.length - 1 ? 0 : currentSlide + 1 });

        //ToDo 3-) STOPE AUTO SLIDE WHEN USER CLICK.
        timer && clearInterval(timer);

        //ToDo 4-) THEN AFTER CLEAR PREVIOUS START AUTO SLIDE AGAIN FOR KEEP WORKING FROM WHERE THE USER STOPPED.
        this.setState({ timer: setInterval(this.autoSlide, duration) });

        //ToDo 5-) REMOVE ACTIVE CLASS FROM SLIDES ITEMS \\ USING .from-METHOD AND SND ARGUMENT OF IT WHICH IS A CALLBACK LOOP-HELPER.
        removeClassAttr(slides);

        //ToDo 6-) ADD CLASS ACTIVE TO CURRENT ITEM.
        slides[currentSlide].classList.add('active');
        // slides[currentSlide].scrollIntoView({ behavior: 'smooth' });

        //ToDo 7-) SAVE CURRENT SLIDE NUMBER IN LOCAL-STORAGE TO KEEP THE ACTIVE SLIDE ON THE CURRENT IMAGE AND KEEP THIS VARIABLE UPDATED WITH EACH setInterval CALL.
        this.dataPersister.persistData(EDataPersistKeys.CurrentSlide, currentSlide);
    };

    private autoSlide = (direction: 'prev' | 'next' = 'next', slides = this.elements.slides): void => {
        this.slide(direction, slides);
    };
    //#endregion Slider Implementation

    //#region Random Background Controller
    private onRandomBg = (isActive: boolean) => {
        const { timer, duration } = this.state;

        isActive ? this.setState({ timer: setInterval(this.autoSlide, duration) }) : clearInterval(timer);
    };

    private persistedRandomBgOption = () => {
        const { timer, duration } = this.state;
        const { slides } = this.elements;

        this.setState({ currentSlide: parseInt(this.dataPersister.readData(EDataPersistKeys.CurrentSlide), 10) || 0 });

        const isRandomBackgroundPersisted = this.dataPersister.readData<boolean>(EDataPersistKeys.RandomBackground);

        if (isRandomBackgroundPersisted || isRandomBackgroundPersisted === null) {
            removeClassAttr(slides);

            slides[this.state.currentSlide].classList.add('active');

            this.setState({ timer: setInterval(this.autoSlide, duration) });
        } else if (!isRandomBackgroundPersisted) {
            removeClassAttr(slides);

            slides[this.state.currentSlide].classList.add('active');

            clearInterval(timer);
        }
    };
    //#endregion Random Background Controller

    getPersistedData = () => {
        this.persistedRandomBgOption();
    };
}
