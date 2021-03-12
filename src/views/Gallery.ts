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



// <section class="our-gallery">
// <div class="container">
//     <header>
//         <h2>our gallery</h2>
// <hr />
// </header>
//
// <div class="images-box">
// <div class="image-box"><img src="./images/ourSkills/H4DcmF.jpg" alt="grass green" /></div>
//     <div class="image-box"><img src="./images/ourSkills/10.jpg" alt="artist" /></div>
//     <div class="image-box"><img src="./images/ourSkills/4.jpg" alt="wave" /></div>
//     <div class="image-box"><img src="./images/ourSkills/9rQ3DP.jpg" alt="wave sea" /></div>
//     <div class="image-box">
// <img src="https://eskipaper.com/images/sci-fi-wallpaper-1.jpg" alt="" />
//     </div>
//     <div class="image-box">
// <img src="https://wallpaperaccess.com/full/439756.jpg" alt="storm" />
//     </div>
//     <div class="image-box"><img src="https://i.imgur.com/5VOiHDo.jpg" alt="nice look" /></div>
//     <div class="image-box">
// <img src="./images/gallery/cool-nature-background.jpg" alt="nature" />
//     </div>
//     <div class="image-box"><img src="./images/gallery/548309.jpg" alt="" /></div>
//     <div class="image-box">
// <img src="./images/gallery/Shenandoah-national.jpg" alt="Shenandoah" />
//     </div>
//
//     <div class="popup">
// <button><i class="fas fa-times"></i></button>
//
// <div class="popup-box">
// <img src="" alt="" />
// <h4 class="title"></h4>
//     </div>
//     </div>
//     </div>
//     </div>
//     </section>

