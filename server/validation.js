const Joi = require("@hapi/joi");

//Reference: https://softchris.github.io/pages/joi.html#introducing-joi
//Validation Rules for new user registration
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    //match: Joi.string().regex(/^[0-9+]{7}-[0-9+]{1}$/).required()
  });

  return schema.validate(data);
};

//Validation Rules for existing user 
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
