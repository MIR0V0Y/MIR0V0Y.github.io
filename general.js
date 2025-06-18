var tg = window.Telegram.WebApp;


var UserUIN;
var credentials;
var serverURL;


tg.SettingsButton.onClick(() => {
    window.location.href = '/settings/settings.html';
});
tg.SettingsButton.show();

function getValue(key) {
    return new Promise((resolve, reject) => {
        tg.DeviceStorage.getItem(key, (error, value) => {
            if (error != null) {
                tg.showAlert("Ошибка ", error);
                reject(error);
                return;
            }
            resolve(value);
        });
    });
}

function getSecureValue(key) {
    return new Promise((resolve, reject) => {
        tg.SecureStorage.getItem(key, (error, value) => {
            if (error != null) {
                tg.showAlert("Ошибка ", error);
                reject(error);
                return;
            }
            resolve(value);
        });
    });
}


getValue('credentials')
    .then((value) => {
        if (value != null) {
            console.log("Вы авторизированны");
            credentials = value;
        } else {
            console.log("Вы не авторизированны!");
            switch (window.location.href) {
                case (window.location.origin + '/singin/singin.html'):
                    break;
                case (window.location.origin + '/settings/settings.html'):
                    break;
                default:
                window.location.href = '/singin/singin.html';
            }
        }
    })
    .catch((error) => {
        console.log("Вы не авторизированны!", error);
    });

getValue('UserUIN')
    .then((value) => {
        if ((value != null) && (value != undefined) && (value != '')) {
            console.log("Вы авторизированны");
            UserUIN = value;
        } else {
            console.log("Вы не авторизированны!");
            switch (window.location.href) {
                case (window.location.origin + '/singin/singin.html'):
                    break;
                case (window.location.origin + '/settings/settings.html'):
                    break;
                default:
                window.location.href = '/singin/singin.html';
            }
        }
    })
    .catch((error) => {
        console.log("Вы не авторизированны!", error);
    });

getValue('serverURL')
    .then((value) => {
        if ((value != null) && (value != undefined) && (value != '')) {
            console.log("Вы авторизированны");
            serverURL = value;
        } else {
            console.log("Вы не авторизированны!");
            switch (window.location.href) {
                case (window.location.origin + '/singin/singin.html'):
                    break;
                case (window.location.origin + '/settings/settings.html'):
                    break;
                default:
                    window.location.href = '/singin/singin.html';
            }

        }
    })
    .catch((error) => {
        console.log("Вы не авторизированны!", error);
    });

