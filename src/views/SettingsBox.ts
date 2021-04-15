import { View } from '@views/*';
import { removeClassAttr } from '@utils/*';
import { DataPersistKeys, HTMLElementEvent, ObservablesDescriptors, PersistedNavigationBulletsOptions } from '@appTypes/*';

interface ISettingsBoxElements {
    settingsBox: HTMLDivElement;
    settingsBoxToggleBtn: HTMLButtonElement;
    optionBoxColorsList: NodeListOf<HTMLLIElement>;
    optionBoxRandomBg: NodeListOf<HTMLSpanElement>;
    optionBoxBullets: NodeListOf<HTMLSpanElement>;
    resetAllBtn: HTMLButtonElement;
}

export class SettingsBox extends View {
    public readonly selectors: Record<keyof ISettingsBoxElements, string> = {
        settingsBox: '.settings-box',
        settingsBoxToggleBtn: '.toggle-settings',
        optionBoxColorsList: '.option-box--colors-switch .colors-list li',
        optionBoxRandomBg: '.option-box--random_bg span',
        optionBoxBullets: '.option-box--bullets span',
        resetAllBtn: '.option-box--reset button',
    };

    public get elements(): ISettingsBoxElements {
        const { settingsBox, settingsBoxToggleBtn, optionBoxColorsList, optionBoxRandomBg, optionBoxBullets, resetAllBtn } = this.selectors;

        return {
            settingsBox: document.querySelector<HTMLDivElement>(settingsBox)!,
            settingsBoxToggleBtn: document.querySelector<HTMLButtonElement>(settingsBoxToggleBtn)!,
            optionBoxColorsList: document.querySelectorAll<HTMLLIElement>(optionBoxColorsList)!,
            optionBoxRandomBg: document.querySelectorAll<HTMLSpanElement>(optionBoxRandomBg)!,
            optionBoxBullets: document.querySelectorAll<HTMLSpanElement>(optionBoxBullets)!,
            resetAllBtn: document.querySelector<HTMLButtonElement>(resetAllBtn)!,
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
            [`click:${ settingsBoxToggleBtn }`]: this.onToggleSettingsBox,
            [`click:${ optionBoxColorsList }`]: this.onColorOptionChange,
            [`click:${ optionBoxRandomBg }`]: this.onRandomBackgroundActivationOptionChange,
            [`click:${ optionBoxBullets }`]: this.onBulletsActivationOptionChange,
            [`click:${ resetAllBtn }`]: this.resetAllController,
        };
    }

    private onToggleSettingsBox = ({ currentTarget }: HTMLElementEvent<HTMLButtonElement>): void => {
        const { settingsBox } = this.elements;

        settingsBox.classList.toggle('show');

        currentTarget.firstElementChild!.classList.toggle('fa-spin');

        document.body.style.paddingLeft = window.innerWidth > 991 && !(+document.body.style.paddingLeft.replace('px', '') > 0)
            ? `${ settingsBox.getBoundingClientRect().width }px`
            : '';
    };

    //#region Color Option Controller
    private onColorOptionChange = ({ currentTarget }: HTMLElementEvent<HTMLLIElement>): void => {
        removeClassAttr(currentTarget.parentElement?.children!);

        currentTarget.classList.add('active');

        const chosenColorOption = getComputedStyle(currentTarget).backgroundColor;

        document.documentElement.style.setProperty('--primary-color', chosenColorOption);

        this.dataPersister.persistData(DataPersistKeys.ColorOption, chosenColorOption);
    };

    private persistedColorOption = (): void => {
        const { optionBoxColorsList } = this.elements;

        const persistedColorOption = this.dataPersister.readData<string>(DataPersistKeys.ColorOption) ?? '';

        document.documentElement.style.setProperty('--primary-color', persistedColorOption || getComputedStyle(optionBoxColorsList[0]).backgroundColor);

        removeClassAttr(optionBoxColorsList);

        (Array.from(optionBoxColorsList).find((option): boolean => getComputedStyle(option).backgroundColor.includes(persistedColorOption)) ?? optionBoxColorsList[0]).classList.add('active');
    };

    //#endregion Color Option Controller

    //#region Bullets Option Controller
    private onBulletsActivationOptionChange = ({ currentTarget }: HTMLElementEvent<HTMLSpanElement>): void => {
        removeClassAttr(currentTarget.parentElement?.children!);

        currentTarget.classList.add('active');

        if (currentTarget.classList.contains('yes')) {
            this.model.trigger<PersistedNavigationBulletsOptions>(ObservablesDescriptors.ShowHideNavigationBullets, PersistedNavigationBulletsOptions.ShowNavigationBullets);

            this.dataPersister.persistData(DataPersistKeys.BulletsOption, PersistedNavigationBulletsOptions.ShowNavigationBullets);
        }
        else if (currentTarget.classList.contains('no')) {
            this.model.trigger<PersistedNavigationBulletsOptions>(ObservablesDescriptors.ShowHideNavigationBullets, PersistedNavigationBulletsOptions.HideNavigationBullets);

            this.dataPersister.persistData(DataPersistKeys.BulletsOption, PersistedNavigationBulletsOptions.HideNavigationBullets);
        }
    };

    private persistedBulletsOption = (): void => {
        const { optionBoxBullets } = this.elements;

        const persistedBulletsOption = this.dataPersister.readData<PersistedNavigationBulletsOptions>(DataPersistKeys.BulletsOption);

        persistedBulletsOption && removeClassAttr(optionBoxBullets);

        if (persistedBulletsOption?.includes(PersistedNavigationBulletsOptions.ShowNavigationBullets)) optionBoxBullets[0].classList.add('active');
        else if (persistedBulletsOption?.includes(PersistedNavigationBulletsOptions.HideNavigationBullets)) optionBoxBullets[1].classList.add('active');
    };

    //#endregion Bullets Option Controller

    //#region Random Background Controller
    private onRandomBackgroundActivationOptionChange = ({ currentTarget }: HTMLElementEvent<HTMLSpanElement>): void => {
        removeClassAttr(currentTarget.parentElement?.children!);

        currentTarget.classList.add('active');

        if (currentTarget.classList.contains('yes')) {
            this.model.trigger<boolean>(ObservablesDescriptors.EnableDisableRandomBackground, true);

            this.dataPersister.persistData(DataPersistKeys.RandomBackground, true);
        }
        else if (currentTarget.classList.contains('no')) {
            this.model.trigger<boolean>(ObservablesDescriptors.EnableDisableRandomBackground, false);

            this.dataPersister.persistData(DataPersistKeys.RandomBackground, false);
        }
    };

    private persistedRandomBgOption = (): void => {
        const { optionBoxRandomBg } = this.elements;

        const isRandomBackgroundPersisted = this.dataPersister.readData<boolean>(DataPersistKeys.RandomBackground);

        removeClassAttr(optionBoxRandomBg);

        optionBoxRandomBg[isRandomBackgroundPersisted === null || isRandomBackgroundPersisted ? 0 : 1].classList.add('active');
    };

    //#endregion Random Background Controller

    private resetAllController = (): void => {
        this.dataPersister.clearData();
        location.reload();
    };

    public getPersistedData = (): void => {
        this.persistedColorOption();
        this.persistedBulletsOption();
        this.persistedRandomBgOption();
    };
}
