'use strict';
const validators = require('../validators');
const mempool = require('../helpers/MempoolHelper');

const TIMEOUT_REQUEST_WINDOW_TIME = require('../constants').TIMEOUT_REQUEST_WINDOW_TIME;


class StarRegistryController {
    /**
     * @param req
     * @param res
     * @param next
     */
    static createVerificationRequest(req, res, next) {
        const validationResult = validators.StarRegistry.checkVerificationRequestSchema(req.body);

        if (validationResult.error) {
            return res.status(400).send({message: validationResult.error.details[0].message})
        }

        const request = mempool.getOrCreateItem(req.body.address);

        res.send(StarRegistryController._formatVerificationRequest(request));
    }


    /**
     *
     * @param rawRequest
     * @returns {{requestTimeStamp: string, walletAddress: string, message: string, validationWindow: number}}
     * @private
     */
    static _formatVerificationRequest(rawRequest) {
        let timeElapse = Number(new Date().getTime().toString().slice(0,-3)) - rawRequest.requestTimeStamp;
        let timeLeft = (TIMEOUT_REQUEST_WINDOW_TIME/1000) - timeElapse;

        return {
            walletAddress: rawRequest.walletAddress,
            requestTimeStamp: rawRequest.requestTimeStamp.toString(),
            message: `${rawRequest.walletAddress}:${rawRequest.requestTimeStamp}:starRegistry`,
            validationWindow: timeLeft
        }
    }
}

module.exports = StarRegistryController;
