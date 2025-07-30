tg.MainButton.setText("Вдарил!");
tg.MainButton.onClick(MBC);
tg.MainButton.show();
tg.SecondaryButton.setText("Сделать шаблоном");
tg.SecondaryButton.onClick(SBC);
tg.SecondaryButton.position = 'top';
tg.SecondaryButton.show();
tg.MainButton.hasShineEffect = true;

var templatesList = [];


tg.DeviceStorage.getItem(key, (error, value) => {
    if (error) {
        console.error('Error getting from DeviceStorage:', error);
        return;
    }
    templatesList = JSON.parse(value);
});

for (let i = 0; i < templatesList.length; i++) {
    const opt = document.createElement("option");
    opt.value = templatesList[i].name;
    opt.text = templatesList[i].name;
    document.getElementById('template-select').add(opt, null);
}

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

    /*
    const opt1 = document.createElement("option");
    opt1.value = "1";
    opt1.text = "Option: Value 1";
    sel.add(opt1, null);
    */

    const selectedIndex = select.selectedIndex;
    brandInput.value = templatesList[selectedIndex].name;
    percentInput.value = templatesList[selectedIndex].percent;
    volumeInput.value = templatesList[selectedIndex].volume;
    priceInput.value = templatesList[selectedIndex].price;

}



function SBC() {

    // Добавлени
    const select = document.getElementById('template-select');
    const brandInput = document.getElementById('brand');
    const percentInput = document.getElementById('percent');
    const volumeInput = document.getElementById('volume');
    const priceInput = document.getElementById('price');

    if (!checkValues(brandInput.value, percentInput.value, volumeInput.value, priceInput.value)) {
        return;
    }


    templatesList.push(
        {
            name: brandInput.value,
            percent: percentInput.value,
            volume: volumeInput.value,
            price: priceInput.value
        }
    )
    
    saveToDeviceStorage('templates', JSON.stringify(templatesList));
}




