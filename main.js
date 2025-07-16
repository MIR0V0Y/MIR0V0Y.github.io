tg.MainButton.setText("Вдарил!");
tg.MainButton.onClick(MBC);
tg.MainButton.show();
tg.MainButton.hasShineEffect = true;

function MBC() {
    // TODO: Выполнить удар
    
}

// Обработчики для показа/скрытия текстовых полей при выборе "Другое"
const selectFields = [
    { selectId: 'brand', otherId: 'brand-other' },
    { selectId: 'percent', otherId: 'percent-other' },
    { selectId: 'volume', otherId: 'volume-other' },
    { selectId: 'price', otherId: 'price-other' }
];

function setupSelectHandler(selectId, otherId) {
    const select = document.getElementById(selectId);
    const other = document.getElementById(otherId);
    
    select.addEventListener('change', function() {
        if (this.value === 'Другое') {
            other.style.display = 'block';
            other.focus();
        } else {
            other.style.display = 'none';
            other.value = '';
        }
    });
}

// Устанавливаем обработчики для всех полей
selectFields.forEach(field => {
    setupSelectHandler(field.selectId, field.otherId);
});

