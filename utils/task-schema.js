const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  completed: Joi.boolean().required()
});

exports.validateTask = (task) => schema.validate(task);