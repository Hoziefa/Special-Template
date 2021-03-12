import { View } from '@views/*';

export class About extends View {
    protected template(): string {
        return `
            <section class="about--us">
                <div class="container">
                    <div class="info-box">
                        <h2>about us</h2>
                         <hr />
                         <p>
                            We're in such a hurry most of the time we never get much chance to talk. The result is a kind of
                            endless day-to-day shallowness, a monotony that leaves a person wondering years later where all
                            the time went and sorry that it's all gone.
                        </p>
                    </div>
                
                    <div class="image-box"><img src="/images/about/web-dev.jpg" alt="code" width="640" height="640" /></div>
                </div>
            </section>
        `;
    }
}
