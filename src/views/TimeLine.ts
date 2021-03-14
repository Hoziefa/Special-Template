import { View } from '@views/*';

export class TimeLine extends View {
    readonly timelines = [
        {
            year: 2018,
            left: {
                heading: 'Web Development',
                description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, provident at
                                        repellat ullam reprehenderit odio voluptas maxime dicta dolorem, aliquam velit
                                        molestias ab, impedit quam?`,
            }, right: {
                heading: 'SEO',
                description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, provident at
                                        repellat ullam reprehenderit odio voluptas maxime dicta dolorem, aliquam velit
                                        molestias ab, impedit quam?`,
            },
        },
        {
            year: 2019,
            left: {
                heading: 'PWA',
                description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, provident at
                                        repellat ullam reprehenderit odio voluptas maxime dicta dolorem, aliquam velit
                                        molestias ab, impedit quam?`,
            }, right: {
                heading: 'Mobile Development',
                description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, provident at
                                        repellat ullam reprehenderit odio voluptas maxime dicta dolorem, aliquam velit
                                        molestias ab, impedit quam?`,
            },
        },
    ];

    protected template(): string {
        return `
            <section class="timeline">
                <div class="container">
                    ${ this.timelines.map(({ year, left, right }) => `
                        <div class="timeline-content">
                            <div class="year">${ year }</div>
        
                            <div class="timeline-hands__container">
                                <div class="left">
                                    <div class="content">
                                        <h3>${ left.heading }</h3>
                                        <p>${ left.description }</p>
                                    </div>
                                </div>
        
                                <div class="right">
                                    <div class="content">
                                        <h3>${ right.heading }</h3>
                                        <p>${ right.description }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('') }
                </div>
            </section>
        `;
    }
}
