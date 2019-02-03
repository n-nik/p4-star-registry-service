'use strict';
const express     = require('express');

const controllers = require('../controllers');
const router      = express.Router();


router.post('/requestValidation', controllers.StarRegistry.createVerificationRequest);
router.post('/message-signature/validate', controllers.StarRegistry.validateSignature);
router.post('/block', controllers.StarRegistry.createBlock);
router.get('/stars/hash::hash', controllers.StarRegistry.getByHash);
router.get('/stars/address::address', controllers.StarRegistry.getByAddress);
router.get('/block/:height', controllers.StarRegistry.getByHeight);


module.exports = router;
