import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { notify } from './notification.js';
import * as api from './api/data.js';

// Импортираме view модулите
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';

// Основен контейнер за рендериране
const main = document.querySelector('main');

// Потребителски данни
let userData = null;

// Функция за обновяване на навигацията
function updateNav() {
    const user = userData || getUserData();
    const userSection = document.querySelector('.user');
    const guestSection = document.querySelector('.guest');
    
    if (user) {
        userSection.style.display = 'block';
        guestSection.style.display = 'none';
        
        // Обновяваме приветствието
        const welcomeSpan = userSection.querySelector('span');
        if (welcomeSpan) {
            welcomeSpan.textContent = `Добре дошъл, ${user.email}`;
        }
    } else {
        userSection.style.display = 'none';
        guestSection.style.display = 'block';
    }
}

// Функции за работа с потребителски данни
function getUserData() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        return {
            _id: sessionStorage.getItem('userId'),
            email: sessionStorage.getItem('email'),
            username: sessionStorage.getItem('username'),
            gender: sessionStorage.getItem('userGender'),
            accessToken: token
        };
    }
    return null;
}

function setUserData(data) {
    userData = data;
    updateNav();
}

function clearUserData() {
    userData = null;
    updateNav();
}

// Middleware за проверка на автентикация
function checkAuth(ctx, next) {
    const user = getUserData();
    if (user) {
        ctx.user = user;
    }
    next();
}

// Middleware за проверка дали потребителят е влязъл
function requireAuth(ctx, next) {
    const user = getUserData();
    if (!user) {
        page.redirect('/');
        return;
    }
    ctx.user = user;
    next();
}

// Middleware за гости (само за неавтентикирани потребители)
function guestOnly(ctx, next) {
    const user = getUserData();
    if (user) {
        page.redirect('/catalog');
        return;
    }
    next();
}

// Функция за рендериране
function renderView(templateFn) {
    return (ctx) => {
        render(templateFn(ctx), main);
    };
}

// Обработчици за форми
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    
    if (!email || !password) {
        notify('Моля попълнете всички полета!');
        return;
    }
    
    try {
        const user = await api.login(email, password);
        setUserData(user);
        notify('Успешно влязохте в системата!');
        page.redirect('/catalog');
    } catch (error) {
        notify('Грешка при влизане: ' + error.message);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username').trim();
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repeatPass = formData.get('repeatPass').trim();
    const gender = formData.get('gender');
    
    // Валидация
    if (!username || !email || !password || !repeatPass) {
        notify('Моля попълнете всички полета!');
        return;
    }
    
    if (password !== repeatPass) {
        notify('Паролите не съвпадат!');
        return;
    }
    
    if (password.length < 3) {
        notify('Паролата трябва да е поне 3 символа!');
        return;
    }
    
    try {
        const user = await api.register(username, email, password, gender);
        setUserData(user);
        notify('Успешна регистрация!');
        page.redirect('/catalog');
    } catch (error) {
        notify('Грешка при регистрация: ' + error.message);
    }
}

async function handleLogout() {
    try {
        await api.logout();
        clearUserData();
        notify('Успешно излязохте от системата!');
        page.redirect('/');
    } catch (error) {
        notify('Грешка при излизане: ' + error.message);
        clearUserData();
        page.redirect('/');
    }
}

async function handleCreateMeme(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const imageUrl = formData.get('imageUrl').trim();
    
    if (!title || !description || !imageUrl) {
        notify('Моля попълнете всички полета!');
        return;
    }
    
    try {
        await api.createMeme({ title, description, imageUrl });
        notify('Meme създаден успешно!');
        page.redirect('/catalog');
    } catch (error) {
        notify('Грешка при създаване: ' + error.message);
    }
}

async function handleEditMeme(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();
    const imageUrl = formData.get('imageUrl').trim();
    
    if (!title || !description || !imageUrl) {
        notify('Моля попълнете всички полета!');
        return;
    }
    
    const memeId = e.target.dataset.id;
    
    try {
        await api.updateMeme(memeId, { title, description, imageUrl });
        notify('Meme редактиран успешно!');
        page.redirect('/details/' + memeId);
    } catch (error) {
        notify('Грешка при редактиране: ' + error.message);
    }
}

async function handleDeleteMeme(memeId) {
    const confirmed = confirm('Сигурни ли сте, че искате да изтриете този meme?');
    
    if (confirmed) {
        try {
            await api.deleteMeme(memeId);
            notify('Meme изтрит успешно!');
            page.redirect('/catalog');
        } catch (error) {
            notify('Грешка при изтриване: ' + error.message);
        }
    }
}

// Настройка на рутиране
page('/', checkAuth, renderView(homePage));
page('/login', guestOnly, renderView(loginPage));
page('/register', guestOnly, renderView(registerPage));
page('/catalog', checkAuth, renderView(catalogPage));
page('/create', requireAuth, renderView(createPage));
page('/details/:id', checkAuth, renderView(detailsPage));
page('/edit/:id', requireAuth, renderView(editPage));
page('/profile', requireAuth, renderView(profilePage));

// Настройка на event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Навигация
    updateNav();
    
    // Logout бутон
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Глобални event listeners с делегиране
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'login-form') {
            handleLogin(e);
        } else if (e.target.id === 'register-form') {
            handleRegister(e);
        } else if (e.target.id === 'create-form') {
            handleCreateMeme(e);
        } else if (e.target.id === 'edit-form') {
            handleEditMeme(e);
        }
    });
    
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            e.preventDefault();
            const memeId = e.target.dataset.id;
            handleDeleteMeme(memeId);
        }
    });
});

// Стартиране на приложението
page.start();

// Експортиране на функции за използване в view модулите
export {
    getUserData,
    setUserData,
    clearUserData,
    handleLogin,
    handleRegister,
    handleLogout,
    handleCreateMeme,
    handleEditMeme,
    handleDeleteMeme
};