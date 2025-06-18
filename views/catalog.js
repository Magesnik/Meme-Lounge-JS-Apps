import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { getAllMemes } from '../api/data.js';

async function loadMemes() {
    try {
        const memes = await getAllMemes();
        
        if (memes.length === 0) {
            return html`<p class="no-memes">Няма мемета в базата данни.</p>`;
        }
        
        return memes.map(meme => html`
            <div class="meme">
                <div class="card">
                    <div class="info">
                        <h2 class="meme-title">${meme.title}</h2>
                        <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
                    </div>
                    <div id="data-buttons">
                        <a class="button" href="/details/${meme._id}">Детайли</a>
                    </div>
                </div>
            </div>
        `);
    } catch (error) {
        console.error('Грешка при зареждане на мемета:', error);
        return html`<p class="no-memes">Грешка при зареждане на мемета.</p>`;
    }
}

export const catalogPage = (ctx) => html`
    <!-- All Memes Page ( for Guests and Users )-->
    <section id="meme-feed">
        <h1>Всички мемета</h1>
        <div id="memes">
            ${until(loadMemes(), html`<p>Зареждане...</p>`)}
        </div>
    </section>
`;