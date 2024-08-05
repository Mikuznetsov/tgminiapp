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

// Function to call showPopup API
function showPopup() {
    // Получаем информацию о товаре
    const productInfo = getProductInfo(3755); // Предположим, что у вас есть функция getProductInfo, которая возвращает информацию о товаре
    console.log(productInfo);
    // Создаем сообщение для попапа, используя результат функции getProductInfo
    //const popupMessage = `Новый продукт: ${productInfo.name}. Описание: ${productInfo.description}. Цена: ${productInfo.price}`;

    Telegram.WebApp.showPopup({
        title: 'Заголовок',
        message: productInfo,
        buttons: [
            { id: 'link', type: 'default', text: 'Open marketing2.site' },
            { type: 'cancel' },
        ]
    }, function (btn) {
        if (btn === 'link') {
            Telegram.WebApp.openLink('https://marketing2.site/');
        }
    });
};

function getProductInfo(product_id) {
    // ID товара, информацию о котором нужно получить
let productId = product_id; // Замените на фактический ID товара

console.log(productId);

// URL для получения информации о товаре по его ID
const apiUrl = `https://marketing2.site/wp-json/wc/v3/products/${productId}`; // Замените на фактический URL вашего сайта WooCommerce
console.log(apiUrl)
// Ваш ключ аутентификации для доступа к API
const apiToken = 'cs_61cdbc46458b2cfec4fb9dca6fa836ed9906ea71';  // Замените на ваш фактический ключ

// Делаем GET-запрос к API WooCommerce
fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
    'Authorization': 'Basic Y2tfZWM3Y2E2NWE5ZTk2YzVjMjU3Yzc3YWMxMGNkNzI4ZjNkZDI4ODNiZDpjc182MWNkYmM0NjQ1OGIyY2ZlYzRmYjlkY2E2ZmE4MzZlZDk5MDZlYTcx'
  }
})
.then(response => response.json())
.then(product => {
  // Создаем HTML карточку продукта
  const productCard = `
    <div class="product-card">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Price: ${product.price}</p>
      <img src="${product.images[0].src}" alt="${product.name}">
    </div>
  `;
  
//return productCard;
  // Добавляем карточку продукта на страницу
  document.getElementById('product-container').innerHTML = productCard;
})
.catch(error => {
  // Обрабатываем ошибки
  console.error('Ошибка при выполнении запроса:', error);
});

}

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