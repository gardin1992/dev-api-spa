'use strict';

/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
    if (req.params.format) { res.json({}); }
    else {
        res.send('<h1>Financial Api</h1>'); //jade template
    }
    /*res.render('home/index', {
        title: 'Node Express Mongoose Boilerplate'
    });*/
};