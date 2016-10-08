/*!
 * Module dependencies
 */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Order schema
 */
let OrderSchema = new Schema({
    total: Number,
    created_at: {type: String, default: ''},
    updated_at: {type: String, default: ''},
    name: {type: String, default: ''},
    email: {type: String, default: ''},
    hashed_password: {type: String, default: ''},
    salt: {type: String, default: ''}
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
OrderSchema.method({});

/**
 * Statics
 */
OrderSchema.static({});

/**
 * Register
 */
var Order = mongoose.model('Order', OrderSchema);

// the schema is useless so far
// we need to create a model using it
module.exports = Order;