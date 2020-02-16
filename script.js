let req = new XMLHttpRequest();
let API_KEY = 'trnsl.1.1.20200211T152056Z.000c8753ab3cef91.aa7ecf804b48e056f53b1a778c917e1211bedec4';
let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
let translateBtn = document.querySelector('#translate_btn');
let statusLine = document.querySelector('.status');
let insertLine = document.querySelector('.response');
let userWord = '';

translateBtn.addEventListener('click', function() {
  userWord = document.querySelector('#input_word').value;
  url += '?key=' + API_KEY;
  url += '&text=' + userWord;
  url += '&lang=en-ru';
  req.addEventListener('load', function () {
    console.log(req.response);
    let response = JSON.parse(req.response);
    if (response.code !== 200) {
      statusLine.innerHTML = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message;
    return;
    }
    if (response.text.length === 0) {
      statusLine.innerHTML = 'К сожалению, перевод для данного слова не найден';
    return;
    }
    insertLine.innerText = response.text;
    url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
  })
  req.open('get', url);
  req.send();
})
