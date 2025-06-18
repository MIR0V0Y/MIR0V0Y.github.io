// Инициализация Telegram Web App
const tg = window.Telegram.WebApp;

// Включаем расширенный режим (если необходимо)
tg.expand();



// Устанавливаем текст для главной кнопки Telegram (как пример)
tg.MainButton.setText("Начать тест");
tg.MainButton.show();
tg.SecondaryButton.show();

tg.SecondaryButton.setText("О тесте");
tg.SecondaryButton.position = "top"
tg.SecondaryButton.isVisible = true

if (tg.SecondaryButton.isSupported()) {
    tg.showAlert("Поддерживается");
} else {
    tg.showAlert("Не поддерживается");
}



function updateContent(html_file) {
    fetch(html_file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сети');
            }
            return response.text();
        })
        .then(data => {
            // Обновляем содержимое контейнера
            document.getElementById('myContainer').innerHTML = data;
        })
        .catch(error => {
            console.error('Произошла ошибка при загрузке:', error);
            document.getElementById('myContainer').innerHTML = '<p>Ошибка загрузки содержимого</p>';
        });
}

updateContent('content1.html')



// Посылаем готовность к отображению интерфейса в клиенте
tg.ready()


tg.MainButton.onClick(function () {
    tg.showAlert("Хорошо, ты нажал на главную кнопку и боту отправились данные");
    tg.sendData("Хорошо, ты нажал на главную кнопку и боту отправились данные");
});

tg.SecondaryButton.onClick(function () {
    tg.showAlert("О тесте...");
});











