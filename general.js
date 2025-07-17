var tg = window.Telegram.WebApp;
const APP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfKA26Ol1EoqLvWgsnYNrBkmPkqIR_X3vFi1pNnySlttnV25FtU0vniOgQl82uYqzI_A/exec';

tg.SettingsButton.onClick(() => {
    window.location.href = '/settings/settings.html';
});
tg.SettingsButton.show();

function sendJsonp(path, data, callbackName) {
    // Проверяем, не выполняется ли уже другой запрос
    if (document.getElementById('jsonp-script')) {
        console.warn('Предыдущий запрос еще не завершен.');
        return;
    }
    const script = document.createElement('script');
    script.id = 'jsonp-script';

    const newData = { ...data, initData: tg.initData };

    const url = new URL(APP_SCRIPT_URL + '/' + path + '/');
    url.searchParams.append('callback', callbackName);
    for (const key in newData) {
        if (newData.hasOwnProperty(key)) {
            url.searchParams.append(key, newData[key]);
        }
    }

    script.src = url.toString();
    
    script.onload = () => {
        // Clean up the script tag once it has been loaded
        document.body.removeChild(script);
    };
    
    script.onerror = () => {
    alert('Не удалось отправить данные. Проверьте подключение к сети.');
    const scriptTag = document.getElementById('jsonp-script');
    if (scriptTag) {
        scriptTag.parentNode.removeChild(scriptTag);
    }
    };

    document.body.appendChild(script);
    console.log('Отправили данные JSONP');
}
