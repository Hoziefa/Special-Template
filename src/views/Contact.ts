import { View } from '@views/*';

export class Contact extends View {
    protected template(): string {
        return `
            <section class="contact" style="background-image: linear-gradient(30deg, #ffffff00, #F8F8FF), url('/images/contact/world-map-computer-wallpaper-51297-52993-hd-wallpapers.jpg')">
                <div class="container">
                    <header><h2>contact us</h2></header>
                    <div class="form">
                        <form action="" method="POST">
                            <div>
                                <input type="text" id="username" autocomplete="off" required/>
                                <label for="username">username</label>
                            </div>
                            <div>
                                <input type="password" id="password" autocomplete="off" required/>
                                <label for="password">password</label>
                            </div>
                            <div>
                                <input type="text" id="email" autocomplete="off" required/>
                                <label for="email">email</label>
                            </div>
                            <div>
                                <textarea id="message" required></textarea>
                                <label for="message">your opinion?</label>
                            </div>
                            <input type="submit" value="send"/>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
}
