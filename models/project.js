const Joi = require('joi');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  dateCreated: {
    type: Date,
    // required: true,
    default: Date.now
  },
  team: {
    type: []
  },
  issues: {
    type: []
  },
  comments: {
    type: []
  },
  active: Boolean
})

const Project = mongoose.model('Project', projectSchema);

function validateProject(project) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(1).max(255).required(),
    // dateHosted: Joi.date().required()
  }
  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;