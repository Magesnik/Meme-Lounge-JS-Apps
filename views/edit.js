import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js';
import { getMemeById } from '../api/data.js';

async function loadEditForm(id, user) {
    try {
        const meme = await getMemeById(id);
        
        // Проверяваме дали потребителят е собственик
        if (!user || user._id !== meme._ownerId) {
            return html`<p>Нямате права да редактирате този meme.</p>`;
        }
        
        return html`
            <!-- Edit Meme Page ( Only for logged user and creator to this meme )-->
            <section id="edit-meme">
                <form id="edit-form" data-id="${meme._id}">
                    <h1>Редактиране на мeme</h1>
                    <div class="container">
                        <label for="title">Заглавие</label>
                        <input id="title" type="text" placeholder="Въведете заглавие" name="title" 
                               value="${meme.title}" required>
                        <label for="description">Описание</label>
                        <textarea id="description" placeholder="Въведете описание" name="description" required>${meme.description}</textarea>
                        <label for="imageUrl">URL на изображение</label>
                        <input id="imageUrl" type="url" placeholder="Въведете URL на изображението" 
                               name="imageUrl" value="${meme.imageUrl}" required>
                        <input type="submit" class="registerbtn button" value="Редактирай мeme">
                    </div>
                </form>
            </section>
        `;
    } catch (error) {
        console.error('Грешка при зареждане на мeme за редактиране:', error);
        return html`<p>Грешка при зареждане на мeme.</p>`;
    }
}

export const editPage = (ctx) => html`
    ${until(loadEditForm(ctx.params.id, ctx.user), html`<p>Зареждане...</p>`)}
`;