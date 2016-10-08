'use strict';

/*
 * Module dependencies.
 */
const mongoose = require('mongoose'),
    local = require('./passport/local'),
    User = mongoose.model('User');

/**
 * Expose
 */
module.exports = function (passport) {
    // serialize and deserialize sessions
    passport.serializeUser(function (user, done) {
        done(null, user.id)
    });
    passport.deserializeUser(function (id, done) {
        User.findOne({_id: id}, done)
    });
    // use these strategies
    passport.use(local);
};