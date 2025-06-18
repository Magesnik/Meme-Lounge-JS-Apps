const errorBox = document.getElementById('errorBox');

export function notify(message, type = 'error') {
    const box = document.getElementById('errorBox');
    
    // Обновяваме съдържанието
    box.innerHTML = `<span>${message}</span>`;
    
    // Показваме уведомлението
    box.style.display = 'block';
    
    // Добавяме клас според типа (може да се използва за различни стилове)
    box.className = `notification ${type}`;
    
    // Скриваме след 3 секунди
    setTimeout(() => {
        box.style.display = 'none';
    }, 3000);
    
    // Също така логваме в конзолата
    console.log(`${type.toUpperCase()}: ${message}`);
}

// Експортираме и други функции за различни типове уведомления
export function notifySuccess(message) {
    notify(message, 'success');
}

export function notifyError(message) {
    notify(message, 'error');
}

export function notifyInfo(message) {
    notify(message, 'info');
}