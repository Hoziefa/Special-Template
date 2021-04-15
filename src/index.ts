import { dataPersister, Eventing, Model } from '@models/*';
import { About, AppFooter, Contact, Features, Gallery, GoToTop, Hero, Loader, NavigationBullets, SettingsBox, Skills, Testimonials, TimeLine } from '@views/*';

import 'assets/scss/main.scss';

//>: Controller
class AppController {
    private static instance: AppController;

    //>: Based Models:
    private readonly root = document.getElementById('root')!;

    private readonly model = new Model(new Eventing());

    private readonly dataPersister = dataPersister;

    //>: DOM View:
    public readonly loader = new Loader(this.root, this.model, this.dataPersister);

    public readonly settingsBox = new SettingsBox(this.root, this.model, this.dataPersister);

    public readonly navigationBullets = new NavigationBullets(this.root, this.model, this.dataPersister);

    public readonly goToTop = new GoToTop(this.root, this.model, this.dataPersister);

    public readonly hero = new Hero(this.root, this.model, this.dataPersister);

    public readonly about = new About(this.root, this.model, this.dataPersister);

    public readonly skills = new Skills(this.root, this.model, this.dataPersister);

    public readonly gallery = new Gallery(this.root, this.model, this.dataPersister);

    public readonly timeLine = new TimeLine(this.root, this.model, this.dataPersister);

    public readonly features = new Features(this.root, this.model, this.dataPersister);

    public readonly testimonials = new Testimonials(this.root, this.model, this.dataPersister);

    public readonly contact = new Contact(this.root, this.model, this.dataPersister);

    public readonly appFooter = new AppFooter(this.root, this.model, this.dataPersister);

    private constructor() {}

    public static get state(): AppController {
        if (!AppController.instance) AppController.instance = new AppController();

        return AppController.instance;
    }

    public renderElementsToDOM(): void {
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

const { state } = AppController;

state.renderElementsToDOM();

window.addEventListener('load', (): void => {
    state.loader.onLoadDisplayLoader();

    state.settingsBox.getPersistedData();

    state.navigationBullets.getPersistedData();

    state.hero.getPersistedData();
});
