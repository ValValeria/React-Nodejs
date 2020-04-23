"[{"text":[[""],[{"h1":["Промисы"]}],["Функция, переданная в
 конструкцию new Promise, называется исполнитель (executor). Когда Promise создаётся, 
 она запускается автоматически. "],[{"image":""}]],"code":["let promise = 
 new Promise(function(resolve, reject) {","});"]},{"text":[["Её аргумент
 ы resolve и reject – это колбэки, которые предоставляет сам JavaScript. Наш к
 од – только внутри исполнителя.","Когда он получает р
 езультат, сейчас или позже – не важно, он должен вызвать один из этих колбэков:"
 ,"resolve(value) — если работа завершилась успешно, с результатом value.","reject(error
 ) — если произошла ошибка, error – объект ошибки."],
[{"image":"\nhttps://learn.javascript.ru/article/promise/promiseInit@2x.png\n"}]],"code":[""]}]"