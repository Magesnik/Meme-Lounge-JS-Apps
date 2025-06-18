import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { getMemeById } from '../api/data.js';

async function loadMeme(id, user) {
    try {
        const meme = await getMemeById(id);
        const isOwner = user && user._id === meme._ownerId;
        
        return html`
            <section id="meme-details">
                <h1>Заглавие на мeme: ${meme.title}</h1>
                <div class="meme-details">
                    <div class="meme-img">
                        <img alt="meme-alt" src="${meme.imageUrl}">
                    </div>
                    <div class="meme-description">
                        <h2>Описание на мeme</h2>
                        <p>${meme.description}</p>

                        ${isOwner ? html`
                            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                            <a class="button warning" href="/edit/${meme._id}">Редактиране</a>
                            <button class="button danger delete-btn" data-id="${meme._id}">Изтриване</button>
                        ` : ''}
                    </div>
                </div>
            </section>
        `;
    } catch (error) {
        console.error('Грешка при зареждане на мeme:', error);
        return html`<p>Грешка при зареждане на мeme.</p>`;
    }
}

export const detailsPage = (ctx) => html`
    ${until(loadMeme(ctx.params.id, ctx.user), html`<p>Зареждане...</p>`)}
`;