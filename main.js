tg.MainButton.setText("Вдарил!");
tg.MainButton.onClick(MBC);
tg.MainButton.show();
tg.MainButton.disable();

function MBC() {
    // TODO: Выполнить удар
}
// Функция для проверки заполнения полей
function checkFields() {
    const volume = document.getElementById('volume').value;
    const percent = document.getElementById('percent').value;
    const brand = document.getElementById('brand').value;
    const price = document.getElementById('price').value;
    
    if (volume && percent) {
        tg.MainButton.enable();
        if (brand && price) {
            tg.MainButton.hasShineEffect = true;
        } else {
            tg.MainButton.hasShineEffect = false;
        }
    } else {
        tg.MainButton.disable();
    }
}

// Добавляем слушатели событий для полей volume и percent
document.getElementById('volume').addEventListener('input', checkFields);
document.getElementById('percent').addEventListener('input', checkFields);

