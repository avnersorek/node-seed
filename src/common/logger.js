'use strict';
var bunyan = require('bunyan');

function Logger(params) {
	this._logger = bunyan.createLogger({name: params.name});
	this.name = params.name;
}

['debug','info','warn','error','fatal'].forEach((level) => {
	Logger.prototype[level] = function() {
		this._logger[level].apply(this._logger, arguments);
	};
});

function getLogger() {
	var loggerName = getCallerFilename().match(/^.*[\\\/]([^.]*)/)[1];

	return new Logger({
		name : loggerName
	});
}

module.exports = {
	getLogger : getLogger
};


// Everything down here is for getting the function caller name,
// It's a bit shaky and taken from
// http://stackoverflow.com/questions/13227489/how-can-one-get-the-file-path-of-the-caller-function-in-node-js
function getCallerFilename() {
	var origPrepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = function (_, stack) {
		return stack;
	};
	var err = new Error();
	var filename = err.stack[3].receiver.filename;
	Error.prepareStackTrace = origPrepareStackTrace;
	return filename;
}