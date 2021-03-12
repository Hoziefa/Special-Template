// {
//     //% SELECTORS:::
//     let navBulletsElm = document.querySelector(elements.navBullets);
//     let allBulletsElms = navBulletsElm.querySelectorAll(elements.allBullets);
//     let allLinksElms = document.querySelectorAll(elements.allLinks);

//     //% FUNCTIONS:::
//     const navigateController = e => {
//         document.querySelector(e.target.dataset.goto)?.scrollIntoView({ behavior: 'smooth' });
//     };

//     //% EVENT-LISTENERS:::

//     //$ BULLETS ITEMS
//     allBulletsElms.forEach(bullet => bullet.addEventListener('click', navigateController));

//     //$ UL-LI LIST
//     allLinksElms.forEach(link => {
//         link.addEventListener('click', e => {
//             //> The reason was this not working cause this is an anchor tag and have a behavior so we have to prevent it to make this functionality works
//             e.preventDefault();

//             navigateController(e);
//         });
//     });
// }




// <div class="nav-bullets">
// <div class="bullet" data-goto=".about--us"><div class="tooltip">about us</div></div>
// <div class="bullet" data-goto=".our-skills"><div class="tooltip">our skills</div></div>
// <div class="bullet" data-goto=".our-gallery"><div class="tooltip">our gallery</div></div>
// <div class="bullet" data-goto=".timeline"><div class="tooltip">time line</div></div>
// <div class="bullet" data-goto=".our-features"><div class="tooltip">our features</div></div>
// <div class="bullet" data-goto=".testimonials"><div class="tooltip">testimonials</div></div>
// <div class="bullet" data-goto=".contact"><div class="tooltip">contact us</div></div>
// </div>

