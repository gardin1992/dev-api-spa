'use strict';
/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./../../app/models/user');

/**
 * Expose
 */
module.exports = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        let options = {
            criteria: {email: email}
        };

        User.load(options, function (err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {message: 'Unknown user'});
            }
            if (!user.authenticate(password)) {
                return done(null, false, {message: 'Invalid password'});
            }
            return done(null, user);
        });
    }
);