// Init TWA
Telegram.WebApp.ready();

// Event occurs whenever theme settings are changed in the user's Telegram app (including switching to night mode).
Telegram.WebApp.onEvent('themeChanged', function () {
    document.documentElement.className = Telegram.WebApp.colorScheme;
});

// Show main button
Telegram.WebApp.MainButton.setParams({
    text: 'Main Button'
});
Telegram.WebApp.MainButton.onClick(function () {
    Telegram.WebApp.showAlert('Main Button was clicked')
});
Telegram.WebApp.MainButton.show();

function getProductInfo(product_id) {
    let productId = product_id; // Замените на фактический ID товара

    // URL для получения информации о товаре по его ID
    const apiUrl = `https://marketing2.site/wp-json/wc/v3/products/${productId}`; // Замените на фактический URL 

    // Ваш ключ и секрет для HTTP Basic-аутентификации
    const key = 'Basic Y2tfZWM3Y2E2NWE5ZTk2YzVjMjU3Yzc3YWMxMGNkNzI4ZjNkZDI4ODNiZDpjc182MWNkYmM0NjQ1OGIyY2ZlYzRmYjlkY2E2ZmE4MzZlZDk5MDZlYTcx';
    // const secret = 'your_consumer_secret';
    // const token = btoa(`${key}:${secret}`);

    // Возвращаем промис из функции
    return new Promise((resolve, reject) => {
        // Делаем GET-запрос к API WooCommerce
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': key,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(product => {
                resolve(product);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Function to call showPopup API
function showPopup() {
    // Выполняем запрос информации о продукте и обрабатываем результат
    getProductInfo(3755)
        .then(product => {
            
            // Получаем информацию о товаре
            const productInfo = product;
            console.log(productInfo); // Здесь вы можете использовать результат запроса

            // Создаем сообщение для попапа, используя результат функции getProductInfo
            const popupMessage = `Название: ${productInfo.name}. Описание: ${productInfo.description}. Цена: ${productInfo.price}`;

            // Отображаем попап с информацией о продукте
            Telegram.WebApp.showPopup({
                title: 'Каталог',
                message: popupMessage,
                buttons: [
                    { id: 'link', type: 'default', text: 'Перейти на marketing2.site' },
                    { type: 'cancel' }
                ]
            }, function (btn) {
                if (btn === 'link') {
                    Telegram.WebApp.openLink('https://marketing2.site/catalog');
                }
            });
        })
        .catch(error => {
            console.error('Ошибка при получении информации о товаре:', error);
        });
}


// Function to call showPopup API
function showPopupw() {

    // Пример использования функции
    getProductInfo(3755)
        .then(product => {
            console.log(product); // Здесь вы можете использовать результат запроса
            // Получаем информацию о товаре
            const productInfo = product; // Предположим, что у вас есть функция getProductInfo, которая 
            console.log(productInfo);
        })
        .catch(error => {
            console.error('Ошибка при получении информации о товаре:', error);
        });
    // Создаем сообщение для попапа, используя результат функции getProductInfo
    //const popupMessage = `Новый продукт: ${productInfo.name}. Описание: ${productInfo.description}. Цена: ${productInfo.price}`;

    Telegram.WebApp.showPopup({
        title: 'Заголовок',
        message: 'Карточка товара',
        buttons: [
            { id: 'link', type: 'default', text: 'Перейти marketing2.site' },
            { type: 'cancel' },
        ]
    }, function (btn) {
        if (btn === 'link') {
            Telegram.WebApp.openLink('https://marketing2.site/catalog');
        }
    });
};


// Function to toggle main TWA button
function toggleMainButton() {
    if (Telegram.WebApp.MainButton.isVisible) {
        Telegram.WebApp.MainButton.hide();
    } else {
        Telegram.WebApp.MainButton.show();
    }
};

function setViewportData() {
    var sizeEl = document.getElementById('viewport-params-size');
    sizeEl.innerText = 'width: ' + window.innerWidth + ' x ' +
        'height: ' + Telegram.WebApp.viewportStableHeight;

    var expandEl = document.querySelector('#viewport-params-expand');
    expandEl.innerText = 'Is Expanded: ' + (Telegram.WebApp.isExpanded ? 'true' : 'false');
}

Telegram.WebApp.setHeaderColor('secondary_bg_color');

setViewportData();
Telegram.WebApp.onEvent('viewportChanged', setViewportData);

Telegram.WebApp.onEvent('themeChanged', function () {
    document.body.setAttribute('style', '--bg-color:' + Telegram.WebApp.backgroundColor);
});