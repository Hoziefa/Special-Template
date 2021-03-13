import { DataPersister, Eventing, Model } from '@models/*';
import { About, AppFooter, Gallery, GoToTop, Hero, Loader, NavigationBullets, SettingsBox, Skills } from '@views/*';

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

    readonly goToTop = new GoToTop(this.root, this.model, this.dataPersister);

    readonly navigationBullets = new NavigationBullets(this.root, this.model, this.dataPersister);

    readonly hero = new Hero(this.root, this.model, this.dataPersister);

    readonly about = new About(this.root, this.model, this.dataPersister);

    readonly skills = new Skills(this.root, this.model, this.dataPersister);

    readonly gallery = new Gallery(this.root, this.model, this.dataPersister);

    readonly appFooter = new AppFooter(this.root, this.model, this.dataPersister);

    private constructor() {
    }

    static state(): State {
        if (!State.instance) State.instance = new State();

        return State.instance;
    }

    renderElementsToDOM(): void {
        this.loader.render();
        this.settingsBox.render();
        this.goToTop.render();
        this.navigationBullets.render();
        this.hero.render();
        this.about.render();
        this.skills.render();
        this.gallery.render();
        this.appFooter.render();
    }
}

const state = State.state();

state.renderElementsToDOM();

window.addEventListener('load', () => {
    state.loader.onLoadDisplayLoader();

    state.settingsBox.getPersistedData();

    state.hero.getPersistedData();
});

//>: Replaced with code above with @event=load;

// document.addEventListener('DOMContentLoaded', () => {
//     state.renderElementsToDOM();

//     state.loader.onLoadDisplayLoader();

//     state.settingsBox.onDomLoads();
// });
