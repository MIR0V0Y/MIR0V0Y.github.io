tg.MainButton.setText("Вдарил!");
tg.MainButton.onClick(MBC);
tg.MainButton.show();
tg.SecondaryButton.setText("Узнать сколько Вдарил!");
tg.SecondaryButton.onClick(SBC);
tg.SecondaryButton.position = 'top';
tg.SecondaryButton.show();
tg.MainButton.hasShineEffect = true;


/* TODO:
Шаблон стартует с "Новый напиток"
Вторичная кнопка по дефолту должна добавлять шаблон, при заполнении всех полей.
Если пользователь выбрал шаблон, то вторичная кнопка должна удалять шаблон.
Если пользователь выбрал шаблон, и изменил его, вторичная кнопка должна обновлять шаблон

*/

function isPositiveInteger(value) {
    return /^\d+$/.test(value) && Number(value) > 0;
}

function MBC() {
    // TODO: Выполнить удар
    // Получаем значения из полей формы
    const brand = document.getElementById('brand').value.trim();
    const percent = document.getElementById('percent').value.trim();
    const volume = document.getElementById('volume').value.trim();
    const price = document.getElementById('price').value.trim();

    // Проверка на заполненность и корректность
    

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
        sendJsonp('drinked', data, 'consoleLogResult');
}


function SBC () {
    sendJsonp('stats', {}, 'consoleLogResult');
}




function onchangeTemplateSelect() {
    const select = document.getElementById('template-select');
    const brandInput = document.getElementById('brand');
    const percentInput = document.getElementById('percent');
    const volumeInput = document.getElementById('volume');
    const priceInput = document.getElementById('price');

    if (select.value === 'beer_0.5') {
        brandInput.value = 'Пиво';
        percentInput.value = 5;
        volumeInput.value = 500;
        priceInput.value = 150;
    } else {
        brandInput.value = '';
        percentInput.value = '';
        volumeInput.value = '';
        priceInput.value = '';
    }
}