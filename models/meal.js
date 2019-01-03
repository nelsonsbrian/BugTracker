const Joi = require('joi');
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  notes: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  dateOfMeal: {
    type: Date
  },
  cleanUp: {
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
    })
  },
  prep: {
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
    })
  },
  storageLocation: {
    type: String,
    minlength: 1,
    maxlength: 50
  },
  food: {
    type: [ String ]
  },
  type: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack']
  }
})

const Meal = mongoose.model('Meal', mealSchema);

function validateMeal(meal) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    notes: Joi.string().min(1).max(255).required()
  }
  return Joi.validate(meal, schema);
}

exports.Meal = Meal;
exports.validate = validateMeal;