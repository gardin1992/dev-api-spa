'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home'),
    orders = require('../app/controllers/orders');


/**
 * Expose
 */

module.exports = function (app, passport) {

    app.get('/', home.index);
    /*
     * CRUD
     */
    // orders
    app.get('/orders', orders.index);
    app.get('/orders/:id', orders.get);
    app.post('/orders', orders.post);
    app.put('/orders/:id', orders.put);
    app.delete('/orders/:id', orders.delete);

    /**
     * Error handling
     */

    app.use(function (err, req, res, next) {
        // treat as 404
        if (err.message
            && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
            return next();
        }
        console.error(err.stack);
        // error page
        res.status(500).render('500', { error: err.stack });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res, next) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not found'
        });
    });
};