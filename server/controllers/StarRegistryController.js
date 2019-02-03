'use strict';
const bitcoinMessage = require('bitcoinjs-message');

const validators = require('../validators');
const Mempool = require('../helpers/MempoolHelper');

const TIMEOUT_REQUEST_WINDOW_TIME = require('../constants').TIMEOUT_REQUEST_WINDOW_TIME;

const verifyMempool = new Mempool(TIMEOUT_REQUEST_WINDOW_TIME);
const validMempool = new Mempool();

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

        const verificationRequest = verifyMempool.getOrCreateItem(req.body.address);
        const responseData = {
            walletAddress: verificationRequest.address,
            requestTimeStamp: verificationRequest.requestTimeStamp.toString(),
            message: StarRegistryController._getMessage(req.body.address, verificationRequest.requestTimeStamp),
            validationWindow: StarRegistryController._getValidationWindow(verificationRequest.requestTimeStamp)
        };

        res.send(responseData);
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    static validateSignature(req, res, next) {
        const validationResult = validators.StarRegistry.checkSignatureSchema(req.body);

        if (validationResult.error) {
            return res.status(400).send({message: validationResult.error.details[0].message})
        }

        const verificationRequest = verifyMempool.getItem(req.body.address);
        if (!verificationRequest) {
            /* If verification request not exist or validationWindow timeout */
            return res.status(404).send({message: 'Verification request not found'});
        }

        const { address, requestTimeStamp } = verificationRequest;
        const message = StarRegistryController._getMessage(address, requestTimeStamp);

        const isValid = bitcoinMessage.verify(message, address, req.body.signature);
        if (!isValid) {
            return res.status(400).send({message: 'Signature is not valid'});
        }

        verifyMempool.removeItem(address);
        validMempool.createItem(verificationRequest);

        const responseData = {
            registerStar: true,
            status: {
                address,
                message,
                requestTimeStamp: requestTimeStamp.toString(),
                validationWindow: StarRegistryController._getValidationWindow(requestTimeStamp),
                messageSignature: true
            }
        };

        res.send(responseData);
    }

    static _getValidationWindow(timestamp) {
        let timeElapse = Number(new Date().getTime().toString().slice(0,-3)) - timestamp;
        return (TIMEOUT_REQUEST_WINDOW_TIME/1000) - timeElapse;
    }

    static _getMessage(address, timestamp) {
        return `${address}:${timestamp}:starRegistry`
    }

}

module.exports = StarRegistryController;
