

  // Создаем объект XMLHttpRequest, при помощи которого будем отправлять запрос
  let req = new XMLHttpRequest();

  // Сохраняем ключ API, полученный со страницы https://tech.yandex.ru/keys/get/?service=trnsl
  // (с примером ниже работать не будет, нужно получить и вставить свой!)
  let API_KEY = 'trnsl.1.1.20200211T152056Z.000c8753ab3cef91.aa7ecf804b48e056f53b1a778c917e1211bedec4';

  // Сохраняем адрес API
  let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
  let userWord = document.querySelector('#input_word').innerText;
  let translateBtn = document.querySelector('#translate_btn');
  let statusLine = document.querySelector('.status');
  let insertLine = document.querySelector('.response');

  translateBtn.addEventListener('click', function() {
    url += '?key=' + API_KEY; // добавляем к запросу ключ API
    url += '&text=hair' // текст для перевода
    url += '&lang=en-ru'; // направление перевода: с русского на английский
  })
  // Формируем полный адрес запроса:


  // Таким образом формируется строка вида:
  // https://translate.yandex.net/api/v1.5/tr.json/translate?key=example_api_key&text=кролики&lang=ru-en

  // let translate = document.querySelector('.translate');

  // Назначаем обработчик события load
  req.addEventListener('load', function () {
    console.log(req.response); // отображаем в консоли текст ответа сервера
    let response = JSON.parse(req.response); // парсим его из JSON-строки в JavaScript-объект

    // Проверяем статус-код, который прислал сервер
    // 200 — это ОК, остальные — ошибка или что-то другое
    if (response.code !== 200) {
      statusLine.innerHTML = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
      return;
    }

    // Проверяем, найден ли перевод для данного слова
    if (response.text.length === 0) {
      statusLine.innerHTML = 'К сожалению, перевод для данного слова не найден';
      return;
    }

    // Если все в порядке, то отображаем перевод на странице
    insertLine.innerHTML = response.text.join('<br>'); // вставляем его на страницу
  });

  // Обработчик готов, можно отправлять запрос
  // Открываем соединение и отправляем
  req.open('get', url);
  req.send();
