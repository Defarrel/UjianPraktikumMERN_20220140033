const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  deadline: {
    type: Date,
    default: null,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
