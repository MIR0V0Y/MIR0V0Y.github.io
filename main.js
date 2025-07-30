tg.MainButton.setText("Вдарил!");
tg.MainButton.onClick(MBC);
tg.MainButton.show();
tg.SecondaryButton.setText("Сделать шаблоном");
tg.SecondaryButton.onClick(addTemplates);
tg.SecondaryButton.position = 'top';
tg.SecondaryButton.show();
tg.MainButton.hasShineEffect = true;

var templatesList = [];
var staticTemplates = [
    {
        name: '--- Новый напиток ---',
        percent: '',
        volume: '',
        price: ''
    },
    {
        name: 'Пиво 0.5',
        percent: 5,
        volume: 500,
        price: 150
    },
    {
        name: 'Шот 40%',
        percent: 40,
        volume: 100,
        price: 20
    }
]

tg.DeviceStorage.getItem('templates', (error, value) => {
    if (error) {
        console.error('Error getting from DeviceStorage:', error);
        return;
    }
    templatesList = JSON.parse(value);

    for (let i = staticTemplates.length - 1; i >= 0; i--) {
        templatesList.unshift(staticTemplates[i]);
    }

    for (let i = 0; i < templatesList.length; i++) {
        const opt = document.createElement("option");
        opt.value = templatesList[i].name;
        opt.text = templatesList[i].name;
        document.getElementById('template-select').add(opt, null);
    }
});



/* TODO:
Шаблон стартует с "Новый напиток"
Вторичная кнопка по дефолту должна добавлять шаблон, при заполнении всех полей.
Если пользователь выбрал шаблон, то вторичная кнопка должна удалять шаблон.
Если пользователь выбрал шаблон, и изменил его, вторичная кнопка должна обновлять шаблон

*/

function isPositiveInteger(value) {
    return /^\d+$/.test(value) && Number(value) > 0;
}


function checkValues(brand, percent, volume, price) {
    if (
        !brand ||
        !/[^\s]/.test(brand) // не только пробелы/переводы строки
    ) {
        alert('Пожалуйста, введите корректное название напитка.');
        return false;
    }
    if (!isPositiveInteger(percent)) {
        alert('Поле "Процент" должно быть положительным целым числом.');
        return false;
    }
    if (!isPositiveInteger(volume)) {
        alert('Поле "Объем" должно быть положительным целым числом.');
        return false;
    }
    if (!isPositiveInteger(price)) {
        alert('Поле "Цена" должно быть положительным целым числом.');
        return false;
    }
    return true;
}

function MBC() {
    // TODO: Выполнить удар
    // Получаем значения из полей формы
    const brand = document.getElementById('brand').value.trim();
    const percent = document.getElementById('percent').value.trim();
    const volume = document.getElementById('volume').value.trim();
    const price = document.getElementById('price').value.trim();

    // Проверка на заполненность и корректность
    
    if (!checkValues(brand, percent, volume, price)) {
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
    sendJsonp('drinked', data, 'transactionNotifier');
}

function transactionNotifier(response) {
    if (response.status == 'success') {
        tg.showAlert('Напиток успешно добавлен!');
    } else {
        tg.showAlert('Ошибка при добавлении напитка!');
    }
}






function onchangeTemplateSelect() {
    const select = document.getElementById('template-select');
    const brandInput = document.getElementById('brand');
    const percentInput = document.getElementById('percent');
    const volumeInput = document.getElementById('volume');
    const priceInput = document.getElementById('price');


    // Вывод шаблона
    const selectedIndex = select.selectedIndex;
    brandInput.value = templatesList[selectedIndex].name;
    percentInput.value = templatesList[selectedIndex].percent;
    volumeInput.value = templatesList[selectedIndex].volume;
    priceInput.value = templatesList[selectedIndex].price;

    // Логика вторичной кнопки
    if (selectedIndex == 0){
        tg.SecondaryButton.setText("Сделать шаблоном");
        tg.SecondaryButton.onClick(addTemplates);
    } else {
        if (
            brandInput.value == templatesList[selectedIndex].name ||
            percentInput.value == templatesList[selectedIndex].percent ||
            volumeInput.value == templatesList[selectedIndex].volume ||
            priceInput.value == templatesList[selectedIndex].price
        ) {
            tg.SecondaryButton.setText("Удалить шаблон");
            tg.SecondaryButton.onClick(addTemplates);
        } else {
            tg.SecondaryButton.setText("Изменить шаблон");
            tg.SecondaryButton.onClick(addTemplates);
        }
    }

}



function addTemplates() {

    // Добавление в шаблоны
    const select = document.getElementById('template-select');
    const brandInput = document.getElementById('brand');
    const percentInput = document.getElementById('percent');
    const volumeInput = document.getElementById('volume');
    const priceInput = document.getElementById('price');

    if (!checkValues(brandInput.value, percentInput.value, volumeInput.value, priceInput.value)) {
        return;
    }

    
    newTemplatesList = templatesList.slice(staticTemplates.length)
    newTemplatesList.push(
        {
            name: brandInput.value,
            percent: percentInput.value,
            volume: volumeInput.value,
            price: priceInput.value
        }
    )
    
    saveToDeviceStorage('templates', JSON.stringify(newTemplatesList));
}



