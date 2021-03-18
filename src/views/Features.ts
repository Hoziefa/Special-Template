import { View } from '@views/*';

export class Features extends View {
    private readonly featBoxes = [
        { url: 'assets/images/features/icon-1.png', title: 'development', description: 'we are professional marketeers, we will do anything you imagine in no time.' },
        { url: 'assets/images/features/icon-2.png', title: 'development', description: 'we are professional marketeers, we will do anything you imagine in no time.' },
        { url: 'assets/images/features/icon-3.jpg', title: 'development', description: 'we are professional marketeers, we will do anything you imagine in no time.' },
        { url: 'assets/images/features/icon-4.png', title: 'development', description: 'we are professional marketeers, we will do anything you imagine in no time.' },
        { url: 'assets/images/features/icon-5.png', title: 'development', description: 'we are professional marketeers, we will do anything you imagine in no time.' },
        { url: 'assets/images/features/icon-6.png', title: 'development', description: 'we are professional marketeers, we will do anything you imagine in no time.' },
    ];

    protected template(): string {
        return `
            <section class="our-features">
                <div class="container">
                    <header>
                        <h2>our features</h2>
                        <hr/>
                    </header>
        
                    <div class="feat-box__container">
                        ${ this.featBoxes.map(({ url, title, description }) => `
                            <div class="feat-box">
                                <img src="${ url }" alt="${ title }"/>
                                <div class="title">${ title }</div>
                                <p class="description">${ description }</p>
                            </div>
                        `).join('') }
                    </div>
                </div>
            </section>
        `;
    }
}
