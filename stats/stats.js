tg.SecondaryButton.setText("Обновить");
tg.SecondaryButton.onClick(SBC);
tg.SecondaryButton.position = 'top';
tg.SecondaryButton.show();

function SBC () {
    sendJsonp('stats', {}, 'updateStats');
}

function updateStats (response) {
    stats = response.message[0];
    document.getElementById('drinks-24h').textContent = stats[1];
    document.getElementById('liters-24h').textContent = stats[2];
    document.getElementById('alcohol-24h').textContent = stats[3];
    document.getElementById('drinks-7d').textContent = stats[4];
    document.getElementById('liters-7d').textContent = stats[5];
    document.getElementById('alcohol-7d').textContent = stats[6];
    document.getElementById('drinks-30d').textContent = stats[7];
    document.getElementById('liters-30d').textContent = stats[8];
    document.getElementById('alcohol-30d').textContent = stats[9];
}

SBC();