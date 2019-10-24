"use strict";
let express = require('express')
	, http = require('http')
	, path = require('path')
	, bodyParser = require('body-parser')
	, favicon = require('serve-favicon')
	, logger = require('morgan')
	, methodOverride = require('method-override')
	, productRoutes = require('./products');

let app = express();

let clientPath = (location)=>{
	return path.resolve(__dirname, '..', '..', location)
}

app.use(productRoutes)

app.set('port', process.env.PORT || 9000);
app.use(favicon(clientPath('client/public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(clientPath('client/build')));

if (app.get('env') == 'development') {
	app.locals.pretty = true;
}

app.get('*', (req, res) => {
	res.sendFile(clientPath('client/dist/index.html'));
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});