// {
//     //% FUNCTIONS:::
//     // calculation is: window.pageYoffset > (elements.ourSkills.offsetTop + elements.ourSkills.offsetHeight - window.innerHeight)
//     const scrollController = e => {
//         let firstTextElement = document.querySelector('.card:nth-child(1) .number');
//         let secondTextElement = document.querySelector('.card:nth-child(2) .number');
//         let thirdTextElement = document.querySelector('.card:nth-child(3) .number');

//         const pureText = [];

//         for (let elm of [firstTextElement, secondTextElement, thirdTextElement])
//             pureText.push(elm.textContent.trim().replace('%', ''));

//         let [firstText, secondText, thirdText] = pureText;

//         if (pageYOffset + 250 > elements.ourSkills.offsetTop) {
//             document
//                 .querySelector('.card:nth-child(1) svg circle:nth-child(2)')
//                 .style.setProperty('stroke-dashoffset', `calc(440 - (440 * ${firstText}) / 100)`);

//             document
//                 .querySelector('.card:nth-child(2) svg circle:nth-child(2)')
//                 .style.setProperty('stroke-dashoffset', `calc(440 - (440 * ${secondText}) / 100)`);

//             document
//                 .querySelector('.card:nth-child(3) svg circle:nth-child(2)')
//                 .style.setProperty('stroke-dashoffset', `calc(440 - (440 * ${thirdText}) / 100)`);
//         }
//     };

//     //% EVENT-LISTENERS:::
//     window.addEventListener('scroll', scrollController);
// }
