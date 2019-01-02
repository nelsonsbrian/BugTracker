const Joi = require('joi');
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 15
      },
    }),
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  }
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
  const schema = {
    message: Joi.string().min(1).max(255).required()
  }
  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validateComment;