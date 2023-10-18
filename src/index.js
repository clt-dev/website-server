'use strict';

const cors = require('cors');
const config = require('../config/keys');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

function setupCors() {
	app.use(cors({
		origin: `${config.publicDomain}`,
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
		credentials: true
	}));
}

function setupMiddleware() {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(express.static(path.join(__dirname, 'client/build')));
}

function setupRoutes() {
	var inquiry = require('./routes/inquiry.js');

	app.use(inquiry);
}

function startServer() {
	const port = config.proxyPort || 5000;
	app.listen(port, () => console.log(`Listening on port ${port}`));
}

const app = express();

setupCors();
setupMiddleware();
setupRoutes();
startServer();