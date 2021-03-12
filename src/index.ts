import { DataPersister, Eventing, Model } from '@models/*';
import { Loader, SettingsBox, Hero } from '@views/*';

import 'assets/scss/_main-style.scss';

class State {
    private static instance: State;

    //>: Based:
    readonly root = document.getElementById('root')!;
    readonly model = new Model(new Eventing());
    readonly dataPersister = DataPersister;

    //>: DOM:
    readonly loader = new Loader(this.root, this.model, this.dataPersister);
    readonly settingsBox = new SettingsBox(this.root, this.model, this.dataPersister);
    readonly hero = new Hero(this.root, this.model, this.dataPersister);

    private constructor() {}

    static state(): State {
        if (!State.instance) State.instance = new State();

        return State.instance;
    }

    renderElementsToDOM(): void {
        // this.loader.render();
        this.hero.render();
        this.settingsBox.render();
    }
}

const state = State.state();

// document.addEventListener('DOMContentLoaded', () => {
//     state.renderElementsToDOM();

//     state.loader.onLoadDisplayLoader();

//     state.settingsBox.onDomLoads();
// });

state.renderElementsToDOM();

window.addEventListener('load', () => {
    state.loader.onLoadDisplayLoader();

    state.settingsBox.onDomLoads();
});
