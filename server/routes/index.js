'use strict';
const express     = require('express');

const controllers = require('../controllers');
const router      = express.Router();


router.post('/requestValidation', controllers.StarRegistry.createVerificationRequest);


module.exports = router;
