import { View } from '@views/*';

interface ISkillsElements {
    skillsContainer: HTMLDivElement
}

export class Skills extends View {
    private readonly skillsList = [
        { number: 90, text: 'html' },
        { number: 85, text: 'css' },
        { number: 60, text: 'javascript' },
        { number: 75, text: 'typescript' },
        { number: 50, text: 'node' },
        { number: 70, text: 'git' },
    ];

    public readonly selectors: Record<keyof ISkillsElements, string> = { skillsContainer: '.our-skills' };

    public get elements(): ISkillsElements {
        return { skillsContainer: document.querySelector<HTMLDivElement>(this.selectors.skillsContainer)! };
    }

    protected template(): string {
        return `
            <section class="our-skills" style="background: url('assets/images/skills/fav-1.jpg') no-repeat">
                <div class="container">
                    <header>
                        <h2>our skills</h2>
                        <hr />
                    </header>
                    <div class="skills-container">
                        ${ this.skillsList.map(({ number, text }): string => `
                            <div class="card">
                                <div class="box">
                                    <div class="percent">
                                        <svg><circle cx="70" cy="70" r="70"></circle><circle cx="70" cy="70" r="70"></circle</svg>
                                        <div class="number"><h2>${ number }<span>%</span></h2></div>
                                    </div>
                                    <h2 class="text">${ text }</h2>
                                </div>
                            </div>
                        `).join('') }
                    </div>
                </div>
            </section>
        `;
    }

    protected eventsMap(): { [p: string]: EventListener } {
        return { 'scroll:html': this.scrollController };
    }

    private scrollController = (): void => {
        const domCardsNumber = document.querySelectorAll<HTMLDivElement>('.card .number')!;

        const texts = Array.from(domCardsNumber).map((domElm): string | undefined => domElm?.textContent?.trim().replace('%', ''));

        texts.forEach((text, idx): void => {
            const svgCircleDomElm = document.querySelector<SVGCircleElement>(`.card:nth-child(${ idx + 1 }) svg circle:nth-child(2)`);

            pageYOffset + 250 > this.elements.skillsContainer.offsetTop && svgCircleDomElm?.style.setProperty('stroke-dashoffset', `calc(440 - (440 * ${ text }) / 100)`);
        });
    };
}
