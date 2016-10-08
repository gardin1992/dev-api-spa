'use strict';

require('dotenv').config();

const fs = require('fs'),
    join = require('path').join,
    express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    config = require('./config'),
    models = join(__dirname, 'app/models');

const app = express(),
    connection = connect();

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

//
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen() {
    if (app.get('env') === 'test') return;
    app.listen(app.get('port'));
    console.log('Express app started on port ' + app.get('port'));
}

function connect() {
    const options = {server: {socketOptions: {keepAlive: 1}}};
    return mongoose.connect(config.db, options).connection;
}