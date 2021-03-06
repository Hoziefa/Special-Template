import { View } from '@views/*';
import { HTMLElementEvent } from '@appTypes/*';

interface IGalleryElements {
    galleryContainer: HTMLElement;
    galleryPopup: HTMLDivElement;
}

export class Gallery extends View {
    private readonly images = [
        { url: 'assets/images/gallery/H4DcmF.jpg"', alt: 'grass green' },
        { url: 'assets/images/gallery/10.jpg', alt: 'artist' },
        { url: 'assets/images/gallery/4.jpg', alt: 'wave' },
        { url: 'assets/images/gallery/9rQ3DP.jpg', alt: 'wave sea' },
        { url: 'assets/images/gallery/12051.jpg', alt: 'night view' },
        { url: 'assets/images/gallery/3254161.jpg', alt: 'storm' },
        { url: 'assets/images/gallery/butterfly.jpg', alt: 'nice look' },
        { url: 'assets/images/gallery/cool-nature-background.jpg', alt: 'nature' },
        { url: 'assets/images/gallery/548309.jpg', alt: 'castle vania' },
        { url: 'assets/images/gallery/Shenandoah-national.jpg', alt: 'Shenandoah' },
    ];

    public readonly selectors: Record<keyof IGalleryElements, string> = { galleryContainer: 'section.our-gallery', galleryPopup: '.our-gallery .popup' };

    public get elements(): IGalleryElements {
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

                    <div class="images-box">${ this.images.map(({ url, alt }): string => `<div class="image-box"><img src="${ url }" alt="${ alt }" /></div>`).join('') }</div>
                    
                    <div class="popup">
                        <button aria-label="cancel-popup"><i class="fas fa-times"></i></button>
                        <figure class="popup-box">
                            <img src="" alt="" />
                            <figcaption class="title"></figcaption>
                        </figure>
                    </div>
                </div>
            </section>
        `;
    }

    protected eventsMap(): { [p: string]: EventListener & any } {
        const { galleryContainer, galleryPopup } = this.selectors;

        return { [`click:${ galleryPopup }`]: this.hidePopupController, [`click:${ galleryContainer }`]: this.galleryPopup };
    }

    private hidePopupController = ({ currentTarget, target }: HTMLElementEvent<HTMLButtonElement, HTMLDivElement>): void => {
        const { galleryPopup } = this.selectors;

        target.matches(`${ galleryPopup }, ${ galleryPopup } button, ${ galleryPopup } button *`) && currentTarget.classList.remove('active');
    };

    private galleryPopup = ({ target }: HTMLElementEvent<HTMLImageElement>): void => {
        if (!(target instanceof HTMLImageElement) || this.elements.galleryPopup.contains(target)) return;

        this.elements.galleryPopup.classList.add('active');
        this.elements.galleryPopup.querySelector('img')!.src = target.src || '';
        this.elements.galleryPopup.querySelector('.title')!.textContent = target.alt || '---:)---';
    };
}
