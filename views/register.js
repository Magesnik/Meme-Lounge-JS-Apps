import { html } from '../node_modules/lit-html/lit-html.js';

export const registerPage = (ctx) => html`
    <!-- Register Page ( Only for guest users ) -->
    <section id="register">
        <form id="register-form">
            <div class="container">
                <h1>Регистрация</h1>
                <label for="username">Потребителско име</label>
                <input id="username" type="text" placeholder="Въведете потребителско име" name="username" required>
                <label for="email">Имейл</label>
                <input id="email" type="email" placeholder="Въведете имейл" name="email" required>
                <label for="password">Парола</label>
                <input id="password" type="password" placeholder="Въведете парола" name="password" required>
                <label for="repeatPass">Повторете паролата</label>
                <input id="repeatPass" type="password" placeholder="Повторете паролата" name="repeatPass" required>
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Жена</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Мъж</label>
                </div>
                <input type="submit" class="registerbtn button" value="Регистрация">
                <div class="container signin">
                    <p>Вече имате профил? <a href="/login">Влизане</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;