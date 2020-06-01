const mongoose = require('mongoose');
var db = mongoose.model;
const Schema = mongoose.Schema;

const productSchema = new Schema({
  trello: { type: Object, required: true },
})

module.exports = db('Ollert', productSchema, 'ollert');