/*!
 * koa-todo - app.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var middlewares = require('koa-middlewares');
var routes = require('./routes');
var config = require('./config');
var path = require('path');
var http = require('http');
var koa = require('koa');
var cors = require('koa-cors');
var app = koa();

var origin = process.env.ORIGIN || 'http://127.0.0.1:3000'
/**
 * response time header
 */
app.use(middlewares.rt());

app.use(middlewares.bodyParser());

if (config.debug && process.env.NODE_ENV !== 'test') {
  app.use(middlewares.logger());
}

app.use(cors({origin: origin}));
/**
 * router
 */
app.use(middlewares.router(app));
routes(app);

app = module.exports = http.createServer(app.callback());

if (!module.parent) {
  app.listen(config.port);
  console.log('$ open http://127.0.0.1:' + config.port);
}
