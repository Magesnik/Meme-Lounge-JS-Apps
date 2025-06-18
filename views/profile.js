import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { getMyMemes } from '../api/data.js';

async function loadProfile(user) {
    try {
        const myMemes = await getMyMemes();
        const avatarSrc = user.gender === 'female' ? '/images/female.png' : '/images/male.png';
        
        return html`
            <!-- Profile Page ( Only for logged users ) -->
            <section id="user-profile-page" class="user-profile">
                <article class="user-info">
                    <img id="user-avatar-url" alt="user-profile" src="${avatarSrc}">
                    <div class="user-content">
                        <p>Потребителско име: ${user.username || 'Няма данни'}</p>
                        <p>Имейл: ${user.email}</p>
                        <p>Моите мемета: ${myMemes.length}</p>
                    </div>
                </article>
                <h1 id="user-listings-title">Потребителски мемета</h1>
                <div class="user-meme-listings">
                    ${myMemes.length === 0 
                        ? html`<p class="no-memes">Няма мемета в базата данни.</p>`
                        : myMemes.map(meme => html`
                            <div class="user-meme">
                                <p class="user-meme-title">${meme.title}</p>
                                <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
                                <a class="button" href="/details/${meme._id}">Детайли</a>
                            </div>
                        `)
                    }
                </div>
            </section>
        `;
    } catch (error) {
        console.error('Грешка при зареждане на профила:', error);
        return html`<p>Грешка при зареждане на профила.</p>`;
    }
}

export const profilePage = (ctx) => html`
    ${until(loadProfile(ctx.user), html`<p>Зареждане на профила...</p>`)}
`;