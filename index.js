'use strict';

/*
 * nodejs-express-mongoose
 * MIT Licensed
 */

/**
 * Module dependencies
 */

require('dotenv').config();

const fs = require('fs'),
    join = require('path').join,
    express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config'),
    models = join(__dirname, 'app/models'),
    port = process.env.PORT || 3000;

const app = express(),
    connection = connect();

/**
 * Expose
 */

module.exports = {
    app,
    connection
};

// Bootstrap models
fs.readdirSync(models)
    .filter(function (file) {
        ~file.indexOf('.js')
    })
    .forEach(function (file) {
        require(join(models, file))
    });

// Bootstrap routes
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen() {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}

function connect() {
    const options = {server: {socketOptions: {keepAlive: 1}}};
    return mongoose.connect(config.db, options).connection;
}