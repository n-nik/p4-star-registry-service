'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const routes     = require('./routes');

//initialize the app
const app = module.exports = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// secure apps by setting various HTTP headers
app.use(helmet());

app.use('/', routes);

