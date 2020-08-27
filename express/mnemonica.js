'use strict';

const {
	define,
	defaultNamespace,
	utils: {
		collectConstructors
	}
} = require('mnemonica');

const Server = define('Server', function (PORT) {
	const express = require('express');
	this.express = express;
	this.app = express();
}, {
	PORT: 3001,
});


const Router = Server.define('Router', function () {
	const router = this;

	const {
		app,
		config,
		routes,
		express: {
			Router
		}
	} = router;

	const routing = Router(this.config);

	Object.entries(routes).forEach(([path, routeName]) => {
		const routeHandler = async (req, res) => {
			try {
				debugger;
				const result = await new router[routeName](req, res);
				return result;
			} catch (error) {
				debugger;
				return error;
			}
		};

		routing.get(path, routeHandler);
	});

	this.routing = routing;
	app.use(routing);

}, {
	routes: {
		'/': 'MainPageRoute',
		'/about_us': 'AboutUS',
		'/bug': 'BuggyRoute'
	},
	config: {
		caseSensitive: true,
		mergeParams: true,
		strict: true
	}
});

Router.define('MainPageRoute', function (req, res) {
	const {CONFIG_TEXT} = this;
	res.send(`<h1 style="font-size: 200px">${ CONFIG_TEXT }</h1>`);
}, {
	CONFIG_TEXT: 'Hello World!'
});

Router.define('AboutUS', async function (req, res) {
	const getAboutUs = async function () {
		return 'AboutUS';
	};
	const aboutUsDependentText = await getAboutUs();
	res.send(`<h1 style="font-size: 200px">${ aboutUsDependentText }</h1>`);
	return this;
});

Router.define('BuggyRoute', async function (req, res) {
	const getAboutUs = async function () {
		throw new Error('bug');
	};
	const aboutUsDependentText = await getAboutUs();
	res.send(`<h1 style="font-size: 200px">${ aboutUsDependentText }</h1>`);
	return this;
});

defaultNamespace.registerHook('creationError', ({TypeName, inheritedInstance, args}) => {
	if (TypeName === 'BuggyRoute') {
		const [req, res] = args;
		debugger;
		process.nextTick(() => {
			if (!res.finished) {
				console.error(new Error('Unhandled promise rejection !'));
				console.error(inheritedInstance.stack);
				res.end(inheritedInstance.message);
			}
		});
	}
});

defaultNamespace.registerHook('postCreation', ({TypeName, inheritedInstance}) => {
	const {__timestamp__, PORT} = inheritedInstance;
	if (TypeName === 'BuggyRoute') {
		debugger;
	}
	console.log({
		created: TypeName,
		port: PORT,
		time: __timestamp__,
		inheritance: Object.keys(collectConstructors(inheritedInstance)).reverse().join('.').replace('Object.Mnemosyne.Mnemonica.', '')
	})
});

Server.define('Listener', function () {
	const {PORT} = this;
	this.app.listen(PORT);
})




const serverInstance = new Server();
const routerInstance = new serverInstance.Router();
const listenerInstance = new serverInstance.Listener();


