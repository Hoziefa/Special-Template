import { View } from '@views/*';

export class Loader extends View {
    protected template() {
        return `<div class="loader"></div>`;
    }

    onLoadDisplayLoader = () => {
        document.querySelector<HTMLDivElement>('.loader')?.classList.add('active');
    };
}
