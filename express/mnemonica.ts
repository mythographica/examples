'use strict';

import {
	define,
	defaultNamespace,
	utils
} from 'mnemonica';

const {
	collectConstructors
} = utils;


const Server = define( 'Server', function () {
	const express = require( 'express' );
	this.express = express;
	this.app = express();
}, {
	PORT: 3001,
} );


const Router = Server.define( 'Router', function () {
	const router = this;

	const {
		app,
		routes,
		express: {
			Router
		}
	} = router;

	const routing = Router( this.config );

	Object.entries( routes ).forEach( ( [ path, routeName ] ) => {
		const routeHandler = async ( req, res ) => {
			debugger;
			try {
				const result = await new router[ routeName ]( req, res );
				return result;
			} catch ( error ) {
				return error;
			}
		};

		routing.get( path, routeHandler );
	} );

	this.routing = routing;
	app.use( routing );

}, {
	routes: {
		'/': 'MainPageRoute',
		'/about_us': 'AboutUS'
	},
	config: {
		caseSensitive: true,
		mergeParams: true,
		strict: true
	}
} );

Router.define( 'MainPageRoute', function ( req, res ) {
	const { CONFIG_TEXT } = this;
	res.send( `<h1 style="font-size: 200px">${CONFIG_TEXT}</h1>` );
}, {
	CONFIG_TEXT: 'Hello World!'
} );

Router.define( 'AboutUS', async function ( req, res ) {
	const getAboutUs = async function () {
		return 'AboutUS'
	};
	const aboutUsDependentText = await getAboutUs();
	res.send( `<h1 style="font-size: 200px">${aboutUsDependentText}</h1>` );
	return this;
} );

defaultNamespace.registerHook( 'postCreation', ( { TypeName, inheritedInstance } ) => {
	const { __timestamp__, PORT } = inheritedInstance;
	console.log( {
		created: TypeName,
		port: PORT,
		time: __timestamp__,
		inheritance: Object.keys( collectConstructors( inheritedInstance ) ).reverse().join( '.' ).replace( 'Object.Mnemosyne.Mnemonica.', '' )
	} )
} );

Server.define( 'Listen', function () {
	const { PORT } = this;
	this.app.listen( PORT );
} )




const serverInstance = new Server();
new serverInstance.Router();
new serverInstance.Listen();


