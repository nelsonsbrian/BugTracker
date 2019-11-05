const Joi = require('joi');
const mongoose = require('mongoose');

const SimpleUser = new mongoose.Schema({
  type: new mongoose.Schema({
    userId: {
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
  })
});

const issueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  createdBy: SimpleUser,
  assignedTo: [SimpleUser],
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateDue: Date,
  dateCompleted: Date,
  dateLastUpdated: Date,
  comments: []
});



const Issue = mongoose.model('Issue', issueSchema);

function validateIssue(issue) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(255).required()
  }
  return Joi.validate(issue, schema);
}

exports.Issue = Issue;
exports.validate = validateIssue;