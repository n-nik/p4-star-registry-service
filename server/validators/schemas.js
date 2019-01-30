const Joi = require("joi");

module.exports = {
    address: Joi.string().length(34).required(),
};
