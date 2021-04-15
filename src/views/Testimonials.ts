import { View } from '@views/*';

export class Testimonials extends View {
    private readonly testimonials = [
        {
            description: `Adversity is like a strong wind. I don't mean just that it holds us back from places we might
                                otherwise go. It also tears away from us all but the things that cannot be torn, so that
                                afterward we see ourselves as we really are, and not merely as we might like to be.`,
            personInfo: { url: 'assets/images/testimonials/avatar.png', name: 'John Doe', jobTitle: 'Programmer' },
        },
        {
            description: `Adversity is like a strong wind. I don't mean just that it holds us back from places we might
                                otherwise go. It also tears away from us all but the things that cannot be torn, so that
                                afterward we see ourselves as we really are, and not merely as we might like to be.`,
            personInfo: { url: 'assets/images/testimonials/user.png', name: 'Steve Jobs', jobTitle: 'American business magnate' },
        },
        {
            description: `Adversity is like a strong wind. I don't mean just that it holds us back from places we might
                                otherwise go. It also tears away from us all but the things that cannot be torn, so that
                                afterward we see ourselves as we really are, and not merely as we might like to be.`,
            personInfo: { url: 'assets/images/testimonials/avatar-two.png', name: 'Bill Gates', jobTitle: 'American business magnate' },
        },
    ];

    protected template(): string {
        return `
            <section class="testimonials">
                <div class="container">
                    <header><h2>testimonials</h2></header>
                    
                    <div class="testimonials-content">
                        ${ this.testimonials.map(({ description, personInfo: { url, name, jobTitle } }): string => `
                            <div class="testimonials-box">
                                <img src="${ url }" alt="${ name }" width="256" height="256"/>
                                <span class="person-name">${ name }</span>
                                <small class="person-job--title">${ jobTitle }</small>
                                <p class="description">${ description }</p>
                            </div>
                        `).join('') }
                    </div>
                </div>
            </section>
        `;
    }
}
