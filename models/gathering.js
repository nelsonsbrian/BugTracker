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
    type: string,
    minlength: 1,
    maxlength: 255
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateGathering: {
    type: Date
  },
  meals: {
    type: [String]
  },
  attendance: {
    type: [String]
  },
  comments: {
    type: [String]
  }
})

const Gathering = mongoose.model('Gathering', gatheringSchema);

function validateGathering(gathering) {
  const schema = {
    name: Joi.string().mind(5).max(50).required(),
  }
  return Joi.validate(gathering, schema);
}

exports.Gathering = Gathering;
exports.validate = validateGathering;