const Joi = require("joi");
const schemas = require('./schemas');

class StarRegistryValidator {

    /**
     * @param {Object} params
     * @returns {Object}
     */
    static checkVerificationRequestSchema(params) {
        const schema = {
            address: schemas.address
        };

        return StarRegistryValidator._validate(schema, params);

    }

    /**
     * @param {Object} params
     * @returns {Object}
     */
    static checkSignatureSchema(params) {
        const schema = {
            address: schemas.address,
            signature: schemas.signature
        };

        return StarRegistryValidator._validate(schema, params);

    }


    static _validate(schema, params ) {
        return Joi.object().keys(schema).validate(params,  { allowUnknown: false });
    }
}

module.exports = StarRegistryValidator;
