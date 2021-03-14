import { EDataPersistKeys, EObservables, HTMLElementEvent } from '@appTypes/*';
import { removeClassAttr } from '@utils/*';
import { View } from '@views/*';

interface ISettingsBoxElements {
    settingsBox: HTMLDivElement;
    settingsBoxToggleBtn: HTMLButtonElement;
    optionBoxColorsList: NodeListOf<HTMLLIElement>;
    optionBoxRandomBg: NodeListOf<HTMLSpanElement>;
    optionBoxBullets: NodeListOf<HTMLSpanElement>;
    resetAllBtn: HTMLButtonElement;
}

export class SettingsBox extends View {
    readonly selectors: Record<keyof ISettingsBoxElements, string> = {
        settingsBox: '.settings-box',
        settingsBoxToggleBtn: '.toggle-settings',
        optionBoxColorsList: '.option-box--colors-switch .colors-list li',
        optionBoxRandomBg: '.option-box--random_bg span',
        optionBoxBullets: '.option-box--bullets span',
        resetAllBtn: '.option-box--reset button',
    };

    get elements(): ISettingsBoxElements {
        return {
            settingsBox: document.querySelector<HTMLDivElement>(this.selectors.settingsBox)!,
            settingsBoxToggleBtn: document.querySelector<HTMLButtonElement>(this.selectors.settingsBoxToggleBtn)!,
            optionBoxColorsList: document.querySelectorAll<HTMLLIElement>(this.selectors.optionBoxColorsList)!,
            optionBoxRandomBg: document.querySelectorAll<HTMLSpanElement>(this.selectors.optionBoxRandomBg)!,
            optionBoxBullets: document.querySelectorAll<HTMLSpanElement>(this.selectors.optionBoxBullets)!,
            resetAllBtn: document.querySelector<HTMLButtonElement>(this.selectors.resetAllBtn)!,
        };
    }

    protected template(): string {
        return `
            <div class="settings-box">
                <div class="toggle-settings"><i class="fas fa-cog"></i></div>
        
                <div class="settings-container">
                    <div class="option-box--colors-switch">
                        <h4>color option</h4>
                        <ul class="colors-list">
                            <li class="active" data-color="#34a853"></li>
                            <li data-color="#ffeb3b"></li>
                            <li data-color="#e91e63"></li>
                            <li data-color="#03a9f4"></li>
                            <li data-color="#009688"></li>
                            <li data-color="#4a148c"></li>
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

    protected eventsMap(): { [key: string]: (e: Event & any) => void } {
        const { settingsBoxToggleBtn, optionBoxColorsList, optionBoxRandomBg, optionBoxBullets, resetAllBtn } = this.selectors;

        return {
            [`click:${ settingsBoxToggleBtn }`]: this.toggleSettingsBoxController,
            [`click:${ optionBoxColorsList }`]: this.colorOptionsController,
            [`click:${ optionBoxRandomBg }`]: this.randomBgController,
            [`click:${ optionBoxBullets }`]: this.bulletsOptionController,
            [`click:${ resetAllBtn }`]: this.resetAllController,
        };
    }

    private toggleSettingsBoxController = ({ currentTarget }: HTMLElementEvent<HTMLButtonElement>): void => {
        const { settingsBox } = this.elements;

        settingsBox.classList.toggle('show');

        currentTarget.firstElementChild!.classList.toggle('fa-spin');

        document.body.style.paddingLeft = window.innerWidth > 991 && !(+document.body.style.paddingLeft.replace('px', '') > 0)
            ? `${ settingsBox.getBoundingClientRect().width }px`
            : '';
    };

    //#region Color Option Controller
    private colorOptionsController = ({ currentTarget }: HTMLElementEvent<HTMLLIElement>): void => {
        // 1->) REMOVE CLASS ACTIVE FROM ALL LI-ELEMENTS
        removeClassAttr(currentTarget.parentElement?.children!);

        // 2->) ADD CLASS ACTIVE TO THE LI-ELEMENT THAT WE CLICK ON
        currentTarget.classList.add('active');

        // 3->) SET COLOR ON ROOT ELEMENT
        const chosenColorOption = getComputedStyle(currentTarget).backgroundColor;

        document.documentElement.style.setProperty('--primary-color', chosenColorOption);

        // 4->) SAVE THE CHOSEN COLOR TO THE persisting provider
        this.dataPersister.persistData(EDataPersistKeys.ColorOption, chosenColorOption);
    };

    private persistedColorOption = (): void => {
        const { optionBoxColorsList } = this.elements;

        // 5->) SET THE SAVED CHOSEN COLOR TO THE UI FROM LOCAL-STORAGE \ WHEN THE WINDOW LOADS OR CLOSE
        const persistedColorOption = this.dataPersister.readData<string>(EDataPersistKeys.ColorOption) ?? '';

        document.documentElement.style.setProperty('--primary-color', persistedColorOption || getComputedStyle(optionBoxColorsList[0]).backgroundColor);

        removeClassAttr(optionBoxColorsList);

        (Array.from(optionBoxColorsList).find(option => getComputedStyle(option).backgroundColor.includes(persistedColorOption)) ?? optionBoxColorsList[0]).classList.add('active');
    };

    //#endregion Color Option Controller

    //#region Bullets Option Controller
    private bulletsOptionController = ({ currentTarget }: HTMLElementEvent<HTMLSpanElement>): void => {
        // 1->) REMOVE CLASS ACTIVE FROM ALL SPAN-ELEMENTS
        removeClassAttr(currentTarget.parentElement?.children!);

        // 2->) ADD CLASS ACTIVE TO THE SPAN-ELEMENT THAT WE CLICK ON
        currentTarget.classList.add('active');

        // 3->) CHECK WHICH OPTION IS CLICKED TO SET THE LOGIC
        // 4->) STORE OPTION IN LOCAL-STORAGE
        if (currentTarget.classList.contains('yes')) {
            this.model.trigger(EObservables.ShowNavigationBullets);

            this.dataPersister.persistData(EDataPersistKeys.BulletsOption, 'block');
        }
        else if (currentTarget.classList.contains('no')) {
            this.model.trigger(EObservables.HideNavigationBullets);

            this.dataPersister.persistData(EDataPersistKeys.BulletsOption, 'none');
        }
    };

    private persistedBulletsOption = (): void => {
        const { optionBoxBullets } = this.elements;

        const persistedBulletsOption = this.dataPersister.readData<'block' | 'none'>(EDataPersistKeys.BulletsOption);

        persistedBulletsOption && removeClassAttr(optionBoxBullets);

        if (persistedBulletsOption?.includes('block')) optionBoxBullets[0].classList.add('active');
        else if (persistedBulletsOption?.includes('none')) optionBoxBullets[1].classList.add('active');
    };

    //#endregion Bullets Option Controller

    //#region Random Background Controller
    private randomBgController = ({ currentTarget }: HTMLElementEvent<HTMLSpanElement>): void => {
        removeClassAttr(currentTarget.parentElement?.children!);

        currentTarget.classList.add('active');

        if (currentTarget.classList.contains('yes')) {
            this.model.trigger(EObservables.EnableRandomBackground);

            this.dataPersister.persistData(EDataPersistKeys.RandomBackground, true);
        }
        else if (currentTarget.classList.contains('no')) {
            this.model.trigger(EObservables.DisableRandomBackground);

            this.dataPersister.persistData(EDataPersistKeys.RandomBackground, false);
        }
    };

    private persistedRandomBgOption = (): void => {
        const { optionBoxRandomBg } = this.elements;

        const isRandomBackgroundPersisted = this.dataPersister.readData<boolean>(EDataPersistKeys.RandomBackground);

        removeClassAttr(optionBoxRandomBg);

        optionBoxRandomBg[isRandomBackgroundPersisted || isRandomBackgroundPersisted === null ? 0 : 1].classList.add('active');
    };

    //#endregion Random Background Controller

    private resetAllController = (): void => {
        this.dataPersister.clearData();
        location.reload();
    };

    getPersistedData = (): void => {
        this.persistedColorOption();
        this.persistedBulletsOption();
        this.persistedRandomBgOption();
    };
}
