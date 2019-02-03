const Joi = require("joi");

module.exports = {
    address: Joi.string().min(34).required(),
    signature: Joi.string().min(34).required(),
};
