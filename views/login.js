import { html } from '../node_modules/lit-html/lit-html.js';

export const loginPage = (ctx) => html`
    <!-- Login Page ( Only for guest users ) -->
    <section id="login">
        <form id="login-form">
            <div class="container">
                <h1>Влизане</h1>
                <label for="email">Имейл</label>
                <input id="email" placeholder="Въведете имейл" name="email" type="email" required>
                <label for="password">Парола</label>
                <input id="password" type="password" placeholder="Въведете парола" name="password" required>
                <input type="submit" class="registerbtn button" value="Влизане">
                <div class="container signin">
                    <p>Нямате профил? <a href="/register">Регистрация</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;