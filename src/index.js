'use strict';
require("babel/register");
var spawn = require('child_process').spawn;
var rek = require('rekuire');
var logger = rek('logger').getLogger();

// run tests on startup in development
if (process.env.NODE_ENV === 'development') spawn('grunt', [], { stdio : "inherit" });

logger.info("process started");