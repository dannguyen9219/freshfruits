const mongoose = require('./connection.js');

// Pull Schema and model from mongoose using object destructuring //
const { Schema, model } = mongoose;
/* The code above is code destructuring - so you can just write Schema or model instead of mongoose.Schema
const Schema = mongoose.Schema;
const model = mongoose.model;
*/

// Make fruits schema //
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
});

// Make fruit model //
const Fruit = model('Fruit', fruitSchema);

module.exports = Fruit;