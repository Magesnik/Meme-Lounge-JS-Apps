import { html } from '../node_modules/lit-html/lit-html.js';

export const createPage = (ctx) => html`
    <!-- Create Meme Page ( Only for logged users ) -->
    <section id="create-meme">
        <form id="create-form">
            <div class="container">
                <h1>Създай мeme</h1>
                <label for="title">Заглавие</label>
                <input id="title" type="text" placeholder="Въведете заглавие" name="title" required>
                <label for="description">Описание</label>
                <textarea id="description" placeholder="Въведете описание" name="description" required></textarea>
                <label for="imageUrl">Изображение на мeme</label>
                <input id="imageUrl" type="url" placeholder="Въведете URL на изображението" name="imageUrl" required>
                <input type="submit" class="registerbtn button" value="Създай мeme">
            </div>
        </form>
    </section>
`;