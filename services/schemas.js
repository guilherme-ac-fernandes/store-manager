const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  nameSchema,
};
