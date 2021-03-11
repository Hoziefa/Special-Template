import { HTMLElementEvent } from '@appTypes/typeAliases';
import { removeClassAttr } from 'utils/misc';
import { View } from './View';

interface ISettingsBoxState {
    currentSlide: number;
    timer: number;
    duration: number;
}

export class SettingsBox extends View<never, ISettingsBoxState> {
    protected readonly state: ISettingsBoxState = { currentSlide: 0, timer: NaN, duration: 3000 };

    readonly selectors = {
        settingsBox: '.settings-box',
        settingsBoxToggleBtn: '.toggle-settings',
        optionBoxColorsList: '.option-box--colors-switch .colors-list li',
        optionBoxRandomBg: '.option-box--random_bg span',
        optionBoxBullets: '.option-box--bullets span',
        resetAllBtn: '.option-box--reset button',
        navigationBullets: '.nav-bullets',
        slides: '.slide-container .slide-image',
    };

    readonly elements = {
        settingsBox: document.querySelector<HTMLDivElement>(this.selectors.settingsBox)!,
        settingsBoxToggleBtn: document.querySelector<HTMLButtonElement>(this.selectors.settingsBoxToggleBtn)!,
        optionBoxColorsList: document.querySelectorAll<HTMLLIElement>(this.selectors.optionBoxColorsList)!,
        optionBoxRandomBg: document.querySelectorAll<HTMLSpanElement>(this.selectors.optionBoxRandomBg)!,
        optionBoxBullets: document.querySelectorAll<HTMLSpanElement>(this.selectors.optionBoxBullets)!,
        resetAllBtn: document.querySelector<HTMLButtonElement>(this.selectors.resetAllBtn)!,

        //>: Control render order to make this work.
        navigationBullets: document.querySelector<HTMLDivElement>(this.selectors.navigationBullets)!,
        slides: document.querySelectorAll<HTMLDivElement>(this.selectors.slides)!,
    };

    protected onRender() {
        this.setState({ timer: setInterval(this.autoSlide, this.state.duration) });
    }

    protected eventsMap(): { [key: string]: (e: Event & any) => void } {
        const {
            settingsBoxToggleBtn,
            optionBoxColorsList,
            optionBoxRandomBg,
            optionBoxBullets,
            resetAllBtn,
        } = this.selectors;

        return {
            [`${settingsBoxToggleBtn}:click`]: this.toggleSettingsBoxController,
            [`${optionBoxColorsList}:click`]: this.ColorOptionsController,
            [`${optionBoxRandomBg}:click`]: this.randomBgController,
            [`${optionBoxBullets}:click`]: this.bulletsOptionController,
            [`${resetAllBtn}:click`]: this.resetAllController,
        };
    }

    protected template(): string {
        return `
            <div class="settings-box">
                <div class="toggle-settings"><i class="fas fa-cog"></i></div>

                <div class="settings-container">
                    <div class="option-box--colors-switch">
                        <h4>colors options</h4>
                        <ul class="colors-list">
                            <li class="active" data-color="#34a853"></li>
                            <li data-color="#ffeb3b"></li>
                            <li data-color="#e91e63"></li>
                            <li data-color="#03a9f4"></li>
                            <li data-color="#009688"></li>
                        </ul>
                    </div>

                    <div class="option-box--random_bg">
                        <h4>random background</h4>
                        <span class="yes active">yes</span>
                        <span class="no">no</span>
                    </div>

                    <div class="option-box--bullets">
                        <h4>show bullets</h4>
                        <span class="yes active">show</span>
                        <span class="no">hide</span>
                    </div>

                    <div class="option-box--reset"><button>reset all options</button></div>
                </div>
            </div>
        `;
    }

    private toggleSettingsBoxController = ({ currentTarget }: HTMLElementEvent<HTMLButtonElement>) => {
        const { settingsBox } = this.elements;

        settingsBox.classList.toggle('show');

        currentTarget.firstElementChild!.classList.toggle('fa-spin');

        if (!(+document.body.style.paddingLeft > 0)) {
            document.body.style.paddingLeft = `${16}vw` || `${settingsBox.getBoundingClientRect().width}px`;
        } else document.body.style.paddingLeft = '';
    };

    private ColorOptionsController = ({ currentTarget }: HTMLElementEvent<HTMLLIElement>) => {
        //ToDo 1->) REMOVE CLASS ACTIVE FROM ALL LI-ELEMENTS
        removeClassAttr(currentTarget.parentElement?.children!);

        //ToDo 2->) ADD CLASS ACTIVE TO THE LI-ELEMENT THAT WE CLICK ON
        currentTarget!.classList.add('active');

        //ToDo 3->) SET COLOR ON ROOT ELEMENT
        //* THIS APPROACH IS SO STATIC WE IGNORED AND USE THE ONE BELOW CAUSE IT'S MORE DYNAMIC
        // document.documentElement.style.setProperty("--primary-color", e.target.dataset.color);
        //* THIS IS THE BETTER APPROACH TO SWITCH THE PAGE-COLORS
        document.documentElement.style.setProperty('--primary-color', getComputedStyle(currentTarget).backgroundColor);

        //ToDo 4->) SAVE THE CHOSEN COLOR TO THE LOCAL-STORAGE
        this.dataPersister.persistData('color-option', getComputedStyle(currentTarget).backgroundColor);

        //>: Was Out this fn
        //ToDo 5->) SET THE SAVED CHOSEN COLOR TO THE UI FROM LOCAL-STORAGE \ WHEN THE WINDOW LOADS OR CLOSE
        const persistedColorOption = this.dataPersister.readData<string>('color-option');

        document.documentElement.style.setProperty(
            '--primary-color',
            persistedColorOption || getComputedStyle(this.elements.optionBoxColorsList[0]).backgroundColor,
        );

        //ToDo 6->) CHECK FOR ACTIVE CLASS TO KEEP IT ON THE ELEMENT-LI THAT WE CHOSE ITS COLOR
        this.elements.optionBoxColorsList.forEach(option => {
            option.classList.remove('active');

            if (getComputedStyle(option).backgroundColor.includes(persistedColorOption)) {
                option.classList.add('active');
            }
            //> IF NO LI-ELEMENT INCLUDES OR CONTAINS THIS LOCAL-STORAGE KEY MEANS THERE IS NO SUCH KEY SO WE HAVE TO CHECK IF THERE IS NO SUCH KEY AND THEN DEPENDS ON THAT WE ADD THE ACTIVE CLASS ON THE FIRST ELEMENT CAUSE WE ARE DELETING THIS CLASS FROM ALL LI-ELEMENTS IN LINES ABOVE \\ AND WE HAVE TO BE AWARE OF THAT IF WE JUST USED ELSE-BLOCK INSTEAD OF ELSE-IF THIS CODE THAT IS INSIDE OF ELSE-BLOCK WILL RUN IN EACH ITERATION THAT IS THE IF-BLOCK__CONDITION DON'T SATISFIES SO ONE SOLUTION IS TO RETURN FROM IF-BLOCK SO TO STOP THE EXECUTION AND MOVE THE ELSE-BLOCK OUT OF THE LOOP \ OR WE JUST USE THE ELSE-IF
            else if (!persistedColorOption) this.elements.optionBoxColorsList[0].classList.add('active');
        });
    };

    private resetAllController = () => {
        location.reload();
        localStorage.clear();
    };

    private bulletsOptionController = ({ currentTarget }: HTMLElementEvent<HTMLSpanElement>) => {
        const { navigationBullets } = this.elements;

        //ToDo 1->) REMOVE CLASS ACTIVE FROM ALL SPAN-ELEMENTS
        removeClassAttr(currentTarget.parentElement?.children!);

        //ToDo 2->) ADD CLASS ACTIVE TO THE SPAN-ELEMENT THAT WE CLICK ON
        currentTarget.classList.add('active');

        //ToDo 3->) CHECK WHICH OPTION IS CLICKED TO SET THE LOGIC
        //ToDo 4->) STORE OPTION IN LOCAL-STORAGE
        if (currentTarget.classList.contains('yes')) {
            navigationBullets.style.display = 'block';

            this.dataPersister.persistData('bullets-option', 'block');
        }
        /////
        else if (currentTarget.classList.contains('no')) {
            navigationBullets.style.display = 'none';

            this.dataPersister.persistData('bullets-option', 'none');
        }
    };

    private persistedBulletsOption = () => {
        //>: Related to bulletsOptionController

        const { optionBoxBullets, navigationBullets } = this.elements;

        if (localStorage.getItem('bullets-option')?.includes('block')) {
            removeClassAttr(optionBoxBullets);
            optionBoxBullets[0].classList.add('active');

            navigationBullets.style.display = 'block';
        }
        //> WE DID IT AS else-if CAUSE IT IGNORE THE IF-BLOCK IF IT IS NOT TRUE AND RUN THIS AND CAUSED UNEXPECTED ISSUES AND FOR THIS WE HAD TO SPECIFIC THIS LINE CAUSE IF THE IF-BLOCK NOT RUN CHECK FOR THIS INSTEAD OF IF THE IF-BLOCK NOT RUN RUN THIS ELSE-BLOCK IN ALL CASES WE HAD TO SPECIFIC IT
        else if (localStorage.getItem('bullets-option')?.includes('none')) {
            removeClassAttr(optionBoxBullets);
            optionBoxBullets[1].classList.add('active');

            navigationBullets.style.display = 'none';
        }
    };

    private randomBgController = ({ currentTarget }: HTMLElementEvent<HTMLSpanElement>) => {
        const { timer, duration } = this.state;

        //ToDo 1->) REMOVE CLASS ACTIVE FROM ALL SPAN-ELEMENTS
        removeClassAttr(currentTarget.parentElement?.children!);

        //ToDo 2->) ADD CLASS ACTIVE TO THE SPAN-ELEMENT THAT WE CLICK ON
        currentTarget.classList.add('active');

        //ToDo 3->) CHECK IF THE OPTION IS YES SO RUN THE SLIDER IF NO STOP THE SLIDER BY SET AN CLEAR THE INTERVAL AND SET THE STATE VARIABLE TO THE LOCAL-STORAGE DEPENDS ON STATE-VARIABLE VALUE
        //> IN THE CODE BELOW WE HAVE TO UPDATE THE time-VARIABLE WITH THE NEW setInterval CAUSE IT HAVE A DEFERENT IDENTIFIER SO WITH EACH CALL WE HAVE TO UPDATE THE NEW TO CLEAR IT IN THE NEXT CALL TO THE TIMER EITHER IF IT setTimeOut OR setInterval \\ ALWAYS MAKE THE MAIN IMPLEMENTATION FIRST OF ALL AND THE IMPLEMENTATION OF LOCAL-STORAGE LAST OF ALL FOR AVOID WIRED BEHAVIOR
        if (currentTarget.classList.contains('yes')) {
            this.setState({ timer: setInterval(this.autoSlide, duration) });

            this.dataPersister.persistData('random-bg', true);
        } else if (currentTarget.classList.contains('no')) {
            clearInterval(timer);

            this.dataPersister.persistData('random-bg', false);
        }
    };

    private persistedRandomBgOption = () => {
        //>: Related to @method=randomBgController();

        const { currentSlide, timer, duration } = this.state;
        const { slides, optionBoxRandomBg } = this.elements;

        //ToDo 5->) SET THE SAVED CHOICE OPTION TO APP FROM LOCAL-STORAGE \ WHEN THE WINDOW LOADS OR CLOSE
        //> THE LOGIC OF BUILDING THIS LOGIC IS DEPENDS ON STATE-VARIABLE SO IF TRUE DO THIS IF FALSE DO THE OPPOSITE

        //> PARSE CURRENT-SLIDE TO SET IT TO THE FUNCTION-SLIDE TO KEEP THE CLASS-ACTIVE ON THE LAST ELEMENT BEFORE WE RELOAD THE PAGE OR CLOSE IT TO THE HELP THE RANDOM-IMAGE BEHAVIOR
        this.setState({ currentSlide: parseInt(this.dataPersister.readData('currentSlide'), 10) || 0 });

        //> OPTIONAL-CHAINING-OPERATOR USED TO AVOID ERRORS IF THERE IS NO KEY LIKE THIS SO WE CAN'T USE .includes[METHOD] ON IT SO THIS WILL CAUSED AN ERROR
        if (localStorage.getItem('random-bg')?.includes('true')) {
            removeClassAttr(optionBoxRandomBg);
            optionBoxRandomBg[0].classList.add('active');

            removeClassAttr(slides);
            slides[currentSlide].classList.add('active');

            this.setState({ timer: setInterval(this.autoSlide, duration) });
        }
        //> WE DID IT AS else-if CAUSE IT IGNORE THE IF-BLOCK IF IT IS NOT TRUE AND RUN THIS AND CAUSED UNEXPECTED ISSUES AND FOR THIS WE HAD TO SPECIFIC THIS LINE CAUSE IF THE IF-BLOCK NOT RUN CHECK FOR THIS INSTEAD OF IF THE IF-BLOCK NOT RUN RUN THIS ELSE-BLOCK IN ALL CASES WE HAD TO SPECIFIC IT
        else if (localStorage.getItem('random-bg')?.includes('false')) {
            removeClassAttr(optionBoxRandomBg);
            optionBoxRandomBg[1].classList.add('active');

            removeClassAttr(slides);
            slides[currentSlide].classList.add('active');

            clearInterval(timer);
        }
    };

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

        //$ OPTIONAL THIS LINE BELOW IS FOR THE OPTION-BOX RANDOM-BACKGROUND TO STICK IT ON THE CURRENT BG WHEN THE PAGE LOADS OR CLOSED
        //ToDo 7-) SAVE CURRENT SLIDE NUMBER IN LOCAL-STORAGE TO KEEP THE ACTIVE SLIDE ON THE CURRENT IMAGE AND KEEP THIS VARIABLE UPDATED WITH EACH setInterval CALL.
        this.dataPersister.persistData('currentSlide', currentSlide);
    };

    private autoSlide = (direction: 'prev' | 'next' = 'next', slides = this.elements.slides): void => {
        this.slide(direction, slides);
    };

    onDomLoads = () => {
        this.persistedRandomBgOption();
        this.persistedBulletsOption();
    };
}
