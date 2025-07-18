tg.SecondaryButton.setText("Обновить");
tg.SecondaryButton.onClick(SBC);
tg.SecondaryButton.position = 'top';
tg.SecondaryButton.show();

function SBC () {
    sendJsonp('stats', {}, 'updateStats');
}

function updateStats (response) {
    stats = response.message[0];

    Array.from(document.getElementsByClassName('skeleton-loader')).forEach(element => {
        element.classList.remove('skeleton-loader');
    });
    
    document.getElementById('drinks-24h').innerHTML = stats[1];
    document.getElementById('liters-24h').innerHTML = stats[2];
    document.getElementById('alcohol-24h').innerHTML = stats[3];
    document.getElementById('drinks-7d').innerHTML = stats[4];
    document.getElementById('liters-7d').innerHTML = stats[5];
    document.getElementById('alcohol-7d').innerHTML = stats[6];
    document.getElementById('drinks-30d').innerHTML = stats[7];
    document.getElementById('liters-30d').innerHTML = stats[8];
    document.getElementById('alcohol-30d').innerHTML = stats[9];
}

SBC();