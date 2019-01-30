'use strict';
const PORT = 8000;

const http  = require('http');

const app    = require('./server');

http.createServer(app)
    .listen(PORT, () => console.log('Web server started at port %d', PORT));
