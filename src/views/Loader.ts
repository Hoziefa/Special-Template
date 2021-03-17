import { View } from '@views/*';

export class Loader extends View {
    protected template() {
        return `<div class="loader"></div>`;
    }

    onLoadDisplayLoader = (): void => {
        setTimeout(() => {
            const domLoader = document.querySelector<HTMLDivElement>('.loader');

            domLoader?.classList.add('active');

            document.body.style.overflowY = !domLoader?.classList.contains('active') ? 'hidden' : 'auto';
        }, 2000);
    };
}
