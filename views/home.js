import { html } from '../node_modules/lit-html/lit-html.js';

export const homePage = (ctx) => html`
    <!-- Welcome Page ( Only for guest users ) -->
    <section id="welcome">
        <div id="welcome-container">
            <h1>Добре дошли в Meme Lounge</h1>
            <img src="/images/welcome-meme.jpg" alt="meme">
            <h2>Влезте, за да видите нашите мемета веднага!</h2>
            <div id="button-div">
                ${ctx.user 
                    ? html`<a href="/catalog" class="button">Всички мемета</a>` 
                    : html`
                        <a href="/login" class="button">Влизане</a>
                        <a href="/register" class="button">Регистрация</a>
                    `
                }
            </div>
        </div>
    </section>
`;