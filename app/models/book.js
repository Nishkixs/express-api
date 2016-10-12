'use strict';

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title:{
    type: String,
    require: true,
  },
  author: {
    type: String,
    require:
    true,
  },
  _owner: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    require: true,
  }
}, {
  timestamp: true,
}

);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
