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



// <section class="our-skills">
// <div class="container">
//     <h2>our skills</h2>
//
// <hr />
//
// <div class="skills-container">
// <div class="card">
// <div class="box">
// <div class="percent">
// <svg>
//     <circle cx="70" cy="70" r="70"></circle>
//     <circle cx="70" cy="70" r="70"></circle>
//     </svg>
//
//     <div class="number">
//     <h2>90<span>%</span></h2>
// </div>
// </div>
//
// <h2 class="text">html</h2>
//     </div>
//     </div>
//
//     <div class="card">
// <div class="box">
// <div class="percent">
// <svg>
//     <circle cx="70" cy="70" r="70"></circle>
//     <circle cx="70" cy="70" r="70"></circle>
//     </svg>
//
//     <div class="number">
//     <h2>85<span>%</span></h2>
// </div>
// </div>
//
// <h2 class="text">css</h2>
//     </div>
//     </div>
//
//     <div class="card">
// <div class="box">
// <div class="percent">
// <svg>
//     <circle cx="70" cy="70" r="70"></circle>
//     <circle cx="70" cy="70" r="70"></circle>
//     </svg>
//
//     <div class="number">
//     <h2>60<span>%</span></h2>
// </div>
// </div>
//
// <h2 class="text">javascript</h2>
//     </div>
//     </div>
//     </div>
//     </div>
//     </section>