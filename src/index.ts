/*

//_!_!_=*=====  START ANIMATE OUR-SKILLS Section  ======*=/

{
    //% FUNCTIONS:::
    // calculation is: window.pageYoffset > (elements.ourSkills.offsetTop + elements.ourSkills.offsetHeight - window.innerHeight)
    const scrollController = e => {
        let firstTextElement = document.querySelector('.card:nth-child(1) .number');
        let secondTextElement = document.querySelector('.card:nth-child(2) .number');
        let thirdTextElement = document.querySelector('.card:nth-child(3) .number');

        const pureText = [];

        for (let elm of [firstTextElement, secondTextElement, thirdTextElement])
            pureText.push(elm.textContent.trim().replace('%', ''));

        let [firstText, secondText, thirdText] = pureText;

        if (pageYOffset + 250 > elements.ourSkills.offsetTop) {
            document
                .querySelector('.card:nth-child(1) svg circle:nth-child(2)')
                .style.setProperty('stroke-dashoffset', `calc(440 - (440 * ${firstText}) / 100)`);

            document
                .querySelector('.card:nth-child(2) svg circle:nth-child(2)')
                .style.setProperty('stroke-dashoffset', `calc(440 - (440 * ${secondText}) / 100)`);

            document
                .querySelector('.card:nth-child(3) svg circle:nth-child(2)')
                .style.setProperty('stroke-dashoffset', `calc(440 - (440 * ${thirdText}) / 100)`);
        }
    };

    //% EVENT-LISTENERS:::
    window.addEventListener('scroll', scrollController);
}

//_!_!_=*=====  END OF ANIMATE OUR-SKILLS Section  ======*=/

//**********************************************************************************************************
//**********************************************************************************************************

//_!_!_=*=====  START OUR-GALLERY Section  ======*=/

{
    //% SELECTORS:::
    let ourGalleryElement = document.querySelector(elements.ourGallery);
    let galleryImagesElements = ourGalleryElement.querySelectorAll(elements.galleryImages);
    let galleryPopupElement = ourGalleryElement.querySelector(elements.galleryPopup);

    //% FUNCTIONS:::

    //$ HIDE GALLERY POPUP
    const hidePopupController = ({ currentTarget, target }) => {
        if (target.matches('.popup, .popup button, .popup button *'))
            target.closest(elements.galleryPopup).classList.remove('active');
    };

    //$ SHOW GALLERY POPUP
    const galleryPopup = ({ target: { src, alt } }) => {
        galleryPopupElement.classList.add('active');
        galleryPopupElement.querySelector('img').src = src;
        galleryPopupElement.querySelector('.title').textContent = alt || '---:)---';
    };

    //% EVENT-LISTENERS:::
    //$ HIDE GALLERY POPUP

    galleryPopupElement.addEventListener('click', hidePopupController);

    //$ SHOW GALLERY POPUP
    galleryImagesElements.forEach(galleryImage => galleryImage.addEventListener('click', galleryPopup));

    //$ MAKE A SLIDER OF ALL IMAGES
    // const imgsSources = [...galleryPopupElement.querySelectorAll('img')].map(img => img.src);
    // const galleryAutoSlide = _ => slide('next', duration, currentSlide, imgsSources, galleryTimer);
    // let galleryTimer = setInterval(galleryAutoSlide, duration);
}

//_!_!_=*=====  END OF OUR-GALLERY Section  ======*=/

//**********************************************************************************************************
//**********************************************************************************************************

//_!_!_=*=====  START NAVIGATION-BULLETS Section  ======*=/

{
    //% SELECTORS:::
    let navBulletsElm = document.querySelector(elements.navBullets);
    let allBulletsElms = navBulletsElm.querySelectorAll(elements.allBullets);
    let allLinksElms = document.querySelectorAll(elements.allLinks);

    //% FUNCTIONS:::
    const navigateController = e => {
        document.querySelector(e.target.dataset.goto)?.scrollIntoView({ behavior: 'smooth' });
    };

    //% EVENT-LISTENERS:::

    //$ BULLETS ITEMS
    allBulletsElms.forEach(bullet => bullet.addEventListener('click', navigateController));

    //$ UL-LI LIST
    allLinksElms.forEach(link => {
        link.addEventListener('click', e => {
            //> The reason was this not working cause this is an anchor tag and have a behavior so we have to prevent it to make this functionality works
            e.preventDefault();

            navigateController(e);
        });
    });
}

//_!_!_=*=====  END OF NAVIGATION-BULLETS Section  ======*=/

//**********************************************************************************************************
//**********************************************************************************************************

//_!_!_=*=====  START GO TO TOP Section  ======*=/

{
    //% EVENT-LISTENERS:::

    document.addEventListener('scroll', () => {
        pageYOffset > innerHeight - 100
            ? elements.gotoTop.classList.add('render')
            : elements.gotoTop.classList.remove('render');
    });

    elements.gotoTop.addEventListener('click', _ => document.documentElement.scrollIntoView({ behavior: 'smooth' }));
}

//_!_!_=*=====  END OF GO TO TOP Section  ======*=/

//**********************************************************************************************************
//**********************************************************************************************************

//_!_!_=*=====  START MENU-TOGGLE Section  ======*=/

{
    //% FUNCTIONS:::
    const toggleMenu = _ => {
        elements.menuLinksUl.classList.toggle('show');

        elements.toggleMenuBtn.classList.toggle('menu-active');
    };

    //% EVENT-LISTENERS:::
    elements.toggleMenuBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', e => {
        if (e.target.matches(`.links-container, .links-container *`)) return;

        elements.menuLinksUl.classList.remove('show');

        elements.toggleMenuBtn.classList.remove('menu-active');
    });
}
*/

import { DataPersister } from '@models/DataPersister';
import { Loader } from '@views/Loader';

import 'assets/scss/_main-style.scss';

const state = {
    root: document.getElementById('root')!,
};

document.addEventListener('DOMContentLoaded', () => {
    new Loader(state.root, null, DataPersister).onLoadDisplayLoader();
});
