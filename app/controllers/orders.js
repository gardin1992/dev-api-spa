'use strict';

/*!
 * Module dependencies.
 */
const mongoose = require('mongoose'),
    Order = require('./../models/order');

exports.index = function (req, res) {
    var query = Order.find({});
    // execute the query at a later time
    query.exec(function (err, person) {
        console.log(err, person);
        if (err) return handleError(err);

        res.json({'data': person});
    });

    console.log('ra');
};

exports.get = function (req, res) {
    res.json({});
};

exports.post = function (req, res) {
    if (req.params.format) {
        res.json({});
    }
    else {
        res.send('<h1>Insert Order</h1>'); //jade template
    }
    /*res.render('home/index', {
     title: 'Node Express Mongoose Boilerplate'
     });*/
};

exports.put = function (req, res) {
    if (req.params.format) {
        res.json({});
    }
    else {
        res.send('<h1>Att Order</h1>'); //jade template
    }
    /*res.render('home/index', {
     title: 'Node Express Mongoose Boilerplate'
     });*/
};

exports.delete = function (req, res) {
    if (req.params.format) {
        res.json({});
    }
    else {
        res.send('<h1>Delete Order</h1>'); //jade template
    }
    /*res.render('home/index', {
     title: 'Node Express Mongoose Boilerplate'
     });*/
};