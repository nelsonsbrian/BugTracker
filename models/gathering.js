const Joi = require('joi');
const mongoose = require('mongoose');

const gatheringSchema = new mongoose.Schema({
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
    required: true,
    default: Date.now
  },
  dateHosted: {
    type: Date,
    required: true
  },
  meals: {
    type: [String]
  },
  attendance: {
    type: [String]
  },
  comments: {
    type: []
  }
})

const Gathering = mongoose.model('Gathering', gatheringSchema);

function validateGathering(gathering) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(1).max(255).required(),
    dateHosted: Joi.date().required()
  }
  return Joi.validate(gathering, schema);
}

exports.Gathering = Gathering;
exports.validate = validateGathering;