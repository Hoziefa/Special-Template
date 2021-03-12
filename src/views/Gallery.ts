// {
//     //% SELECTORS:::
//     let ourGalleryElement = document.querySelector(elements.ourGallery);
//     let galleryImagesElements = ourGalleryElement.querySelectorAll(elements.galleryImages);
//     let galleryPopupElement = ourGalleryElement.querySelector(elements.galleryPopup);

//     //% FUNCTIONS:::

//     //$ HIDE GALLERY POPUP
//     const hidePopupController = ({ currentTarget, target }) => {
//         if (target.matches('.popup, .popup button, .popup button *'))
//             target.closest(elements.galleryPopup).classList.remove('active');
//     };

//     //$ SHOW GALLERY POPUP
//     const galleryPopup = ({ target: { src, alt } }) => {
//         galleryPopupElement.classList.add('active');
//         galleryPopupElement.querySelector('img').src = src;
//         galleryPopupElement.querySelector('.title').textContent = alt || '---:)---';
//     };

//     //% EVENT-LISTENERS:::
//     //$ HIDE GALLERY POPUP

//     galleryPopupElement.addEventListener('click', hidePopupController);

//     //$ SHOW GALLERY POPUP
//     galleryImagesElements.forEach(galleryImage => galleryImage.addEventListener('click', galleryPopup));

//     //$ MAKE A SLIDER OF ALL IMAGES
//     // const imgsSources = [...galleryPopupElement.querySelectorAll('img')].map(img => img.src);
//     // const galleryAutoSlide = _ => slide('next', duration, currentSlide, imgsSources, galleryTimer);
//     // let galleryTimer = setInterval(galleryAutoSlide, duration);
// }