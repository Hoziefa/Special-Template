import { View } from '@views/*';

export class Loader extends View {
    protected template(): string {
        return `
            <div class="loader">
                <div class="wrapper">
                    <h1 class="title">Loading</h1>
                    <div class="rainbow-marker-loader"></div>
                </div>
           </div>
        `;
    }

    onLoadDisplayLoader = (): void => {
        setTimeout(() => {
            const domLoader = document.querySelector<HTMLDivElement>('.loader');

            domLoader?.classList.add('active');

            document.body.style.overflowY = !domLoader?.classList.contains('active') ? 'hidden' : 'auto';
        }, 500);
    };
}
