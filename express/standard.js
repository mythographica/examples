'use strict';

const PORT = 3001;

const express = require('express');
const app = express();
const router = express.Router({
	caseSensitive: true,
	mergeParams: true,
	strict: true
});

router.get('/', (req, res) => {
	res.send('<h1 style="font-size: 200px">Hello World!</h1>');
});

app.use(router);
app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${ PORT }`)
});



// Что здесь не так ?
/**

Абсолютно ВСЁ!

1. С какими роутами стартовало приложение?
2. На каком порту?
3. Какие запросы оно будет обрабатывать?
4. Как оно будет их логгировать?
5. Где хранится представление обработки запроса
6. Как сменить контекст приложения
7. Как обработать ошибки?

 */