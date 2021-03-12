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