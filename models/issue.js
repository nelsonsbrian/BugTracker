const Joi = require('joi');
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 255
  },
  createdBy: mongoose.Schema.Types.ObjectId,
  assignedTo: [mongoose.Schema.Types.ObjectId],
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