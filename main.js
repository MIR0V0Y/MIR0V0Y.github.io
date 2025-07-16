tg.MainButton.setText("Вдарил!");
tg.MainButton.onClick(MBC);
tg.MainButton.show();
tg.MainButton.hasShineEffect = true;

function MBC() {
    // TODO: Выполнить удар
    // Получаем значения из полей формы
    const brand = document.getElementById('brand').value.trim();
    const percent = document.getElementById('percent').value.trim();
    const volume = document.getElementById('volume').value.trim();
    const price = document.getElementById('price').value.trim();

    // Проверка на заполненность и корректность
    function isPositiveInteger(value) {
        return /^\d+$/.test(value) && Number(value) > 0;
    }

    if (
        !brand ||
        !/[^\s]/.test(brand) // не только пробелы/переводы строки
    ) {
        alert('Пожалуйста, введите корректное название напитка.');
        return;
    }
    if (!isPositiveInteger(percent)) {
        alert('Поле "Процент" должно быть положительным целым числом.');
        return;
    }
    if (!isPositiveInteger(volume)) {
        alert('Поле "Объем" должно быть положительным целым числом.');
        return;
    }
    if (!isPositiveInteger(price)) {
        alert('Поле "Цена" должно быть положительным целым числом.');
        return;
    }

    // Формируем объект с данными
    const data = {
        brand: brand,
        percent: percent,
        volume: volume,
        price: price
    };

    // Отправляем данные через sendJsonp
    sendJsonp(data, 'onSendResult');
}

function onSendResult(response) {
    // Простой callback: покажем результат в alert
    alert('Данные успешно отправлены!');
}

