const Joi = require("joi");

module.exports = {
    address: Joi.string().min(34).required(),
    signature: Joi.string().min(34).required(),
    star: Joi.object().keys({
        dec: Joi.string().required(),
        ra: Joi.string().required(),
        story: Joi.string().max(500).required(),
    }).required()
};
