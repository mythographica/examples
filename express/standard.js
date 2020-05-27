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



// What is wrong Here ?
/**

Everything!

Just, let try to give answers
	to the following questions
		about our app and it's behaviour:

1. Which routes it can serve?
2. Which PORT it runs?
3. Which sort of requests it can server?
4. What is a log format, and what is logging system here?
5. Where is request handler, what is current representation
6. Are we able to change the context of request hanlder at all?
7. What is Error Handling strategy for requests?

... and we might continue

 */