import { HTMLElementEvent } from '@appTypes/*';
import { View } from '@views/*';

interface IGalleryElements {
    galleryContainer: HTMLElement;
    galleryPopup: HTMLDivElement;
}

export class Gallery extends View {
    readonly images = [
        { url: '/images/ourSkills/H4DcmF.jpg"', alt: 'grass green' },
        { url: '/images/ourSkills/10.jpg', alt: 'artist' },
        { url: '/images/ourSkills/4.jpg', alt: 'wave' },
        { url: '/images/ourSkills/9rQ3DP.jpg', alt: 'wave sea' },
        { url: 'https://eskipaper.com/images/sci-fi-wallpaper-1.jpg', alt: 'something' },
        { url: 'https://wallpaperaccess.com/full/439756.jpg', alt: 'storm' },
        { url: 'https://i.imgur.com/5VOiHDo.jpg', alt: 'nice look' },
        { url: '/images/gallery/cool-nature-background.jpg', alt: 'nature' },
        { url: '/images/gallery/548309.jpg', alt: 'something' },
        { url: '/images/gallery/Shenandoah-national.jpg', alt: 'Shenandoah' },
    ];

    readonly selectors: Record<keyof IGalleryElements, string> = { galleryContainer: 'section.our-gallery', galleryPopup: '.images-box .popup' };

    get elements(): IGalleryElements {
        return { galleryContainer: document.querySelector<HTMLElement>(this.selectors.galleryContainer)!, galleryPopup: document.querySelector<HTMLDivElement>(this.selectors.galleryPopup)! };
    }

    protected template(): string {
        return `
            <section class="our-gallery">
                <div class="container">
                    <header>
                        <h2>our gallery</h2>
                        <hr />
                    </header>

                    <div class="images-box">
                        ${ this.images.map(({ url, alt }) => `<div class="image-box"><img src="${ url }" alt="${ alt }" /></div>`).join('') }
                        <div class="popup">
                            <button><i class="fas fa-times"></i></button>
                            <div class="popup-box">
                                <img src="" alt="" />
                                <span class="title"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        `;
    }

    protected eventsMap(): { [p: string]: EventListener & any } {
        const { galleryContainer, galleryPopup } = this.selectors;

        return { [`click:${ galleryPopup }`]: this.hidePopupController, [`click:${ galleryContainer }`]: this.galleryPopup };
    }

    private hidePopupController = ({ currentTarget, target }: HTMLElementEvent<HTMLButtonElement, HTMLDivElement>) => {
        target.matches(`${ this.selectors.galleryPopup }, ${ this.selectors.galleryPopup } button, ${ this.selectors.galleryPopup } button *`) && currentTarget.classList.remove('active');
    };

    private galleryPopup = ({ target }: HTMLElementEvent<HTMLImageElement>) => {
        // if (!target.matches(`${ this.selectors.galleryContainer } .images-box img`)) return;

        //>: Second approach is to do @Type=Guard;.
        //>: || this.elements.galleryPopup.contains(target) ->> Must do this part to determine the image element that we want cause the popup has a image child but we don't this logic to run on.
        if (!(target instanceof HTMLImageElement) || this.elements.galleryPopup.contains(target)) return;

        this.elements.galleryPopup.classList.add('active');
        this.elements.galleryPopup.querySelector('img')!.src = target.src || '';
        this.elements.galleryPopup.querySelector('.title')!.textContent = target.alt || '---:)---';
    };
}
