'use strict';
const express     = require('express');

const controllers = require('../controllers');
const router      = express.Router();


router.post('/requestValidation', controllers.StarRegistry.createVerificationRequest);
router.post('/message-signature/validate', controllers.StarRegistry.validateSignature);


module.exports = router;
