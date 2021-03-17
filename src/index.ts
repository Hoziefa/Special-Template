import { DataPersister, Eventing, Model } from '@models/*';
import { About, AppFooter, Contact, Features, Gallery, GoToTop, Hero, Loader, NavigationBullets, SettingsBox, Skills, Testimonials, TimeLine } from '@views/*';

import 'assets/scss/main.scss';

//>: Controller
class StateController {
    private static instance: StateController;

    //>: Based Models:
    private readonly root = document.getElementById('root')!;

    private readonly model = new Model(new Eventing());

    private readonly dataPersister = DataPersister;

    //>: DOM View:
    readonly loader = new Loader(this.root, this.model, this.dataPersister);

    readonly settingsBox = new SettingsBox(this.root, this.model, this.dataPersister);

    readonly navigationBullets = new NavigationBullets(this.root, this.model, this.dataPersister);

    readonly goToTop = new GoToTop(this.root, this.model, this.dataPersister);

    readonly hero = new Hero(this.root, this.model, this.dataPersister);

    readonly about = new About(this.root, this.model, this.dataPersister);

    readonly skills = new Skills(this.root, this.model, this.dataPersister);

    readonly gallery = new Gallery(this.root, this.model, this.dataPersister);

    readonly timeLine = new TimeLine(this.root, this.model, this.dataPersister);

    readonly features = new Features(this.root, this.model, this.dataPersister);

    readonly testimonials = new Testimonials(this.root, this.model, this.dataPersister);

    readonly contact = new Contact(this.root, this.model, this.dataPersister);

    readonly appFooter = new AppFooter(this.root, this.model, this.dataPersister);

    private constructor() {
    }

    static state(): StateController {
        if (!StateController.instance) StateController.instance = new StateController();

        return StateController.instance;
    }

    renderElementsToDOM(): void {
        this.loader.render();
        this.settingsBox.render();
        this.navigationBullets.render();
        this.goToTop.render();
        this.hero.render();
        this.about.render();
        this.skills.render();
        this.gallery.render();
        this.timeLine.render();
        this.features.render();
        this.testimonials.render();
        this.contact.render();
        this.appFooter.render();
    }
}

const state = StateController.state();

state.renderElementsToDOM();

window.addEventListener('load', () => {
    state.loader.onLoadDisplayLoader();

    state.settingsBox.getPersistedData();

    state.navigationBullets.getPersistedData();

    state.hero.getPersistedData();
});
